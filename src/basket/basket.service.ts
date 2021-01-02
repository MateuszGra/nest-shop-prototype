import { Injectable, Inject } from '@nestjs/common';
import { BasketEntity } from "./basket.entity";
import { RespStatus } from "../interfaces/resp-status";
import { AddToBasketDTO } from "./dto/add-to-basket";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class BasketService {
    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
        @Inject(UsersService) private userService: UsersService,
    ) {
    }


    async getUserBasket(userId: string): Promise<RespStatus> {
        const user: RespStatus = await this.userService.getOne(userId);
        if(!user.isSuccess){
            return {
                isSuccess: false,
                errors: [`User (${userId}) not found`],
            }
        }

        const [basket, count]: [BasketEntity[], number] = await BasketEntity.findAndCount({
            relations: ['product'],
            where: {
                user: userId,
            }
        });
        if (basket.length > 0) {
            return {
                isSuccess: true,
                count: count,
                basket: basket,
            }
        } else {
            return {
                isSuccess: false,
                errors: [`Basket empty`],
            }
        }
    }

    async addToBasket(newBasket: AddToBasketDTO): Promise<RespStatus> {
        const product: RespStatus = await this.productsService.getOne(newBasket.productId);
        if (!product.isSuccess) return product;
        if (newBasket.count > product.items[0].availability || newBasket.count < 1 ){
            return {
                isSuccess: false,
                errors: [
                    "Count must be greater than zero and not greater than product availability",
                    `Count = ${newBasket.count}`,
                    `Availability = ${product.items[0].availability}`,
                ],
            }
        }

        const user: RespStatus = await this.userService.getOne(newBasket.userId);
        if (!user.isSuccess) return user;

        if (user.isSuccess === true && product.isSuccess === true) {
            const basket = new BasketEntity();
            basket.count = newBasket.count;
            basket.user = user.users[0];
            basket.product = product.items[0];
            await basket.save();

            if (basket) {
                return {
                    isSuccess: true,
                    id: basket.id,
                }
            }
        }
    }
}
