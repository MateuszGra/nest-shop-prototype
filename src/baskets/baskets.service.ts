import { Inject, Injectable } from '@nestjs/common';
import { BasketsEntity } from "./baskets.entity";
import { AddToBasketDTO } from "./dto/add-to-basket.dto";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../users/users.service";
import { BasketResp } from "../interfaces/basket";
import { ProductsResp} from "../interfaces/products";
import { UserFilteredResp, UserResp } from "../interfaces/users";
import { ResponseStatus } from "../interfaces/response-status";
import { ProductsEntity } from "../products/products.entity";

@Injectable()
export class BasketsService {
    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
        @Inject(UsersService) private userService: UsersService,
    ) {
    }


    async getUserBasket(userId: string): Promise<BasketResp> {
        const userResp: UserResp = await this.userService.getOne(userId);
        if(!userResp.success) return userResp;

        const [basket, count]: [BasketsEntity[], number] = await BasketsEntity.findAndCount({
            relations: ['product'],
            where: { user: userId }
        });

        const userDiscountCode = userResp.users[0].discountCode ? userResp.users[0].discountCode.code : null;
        const basketRecalculate = await this.productsService.priceRecalculate(basket, userDiscountCode);

        return {
            success: true,
            status: ResponseStatus.ok,
            count: count,
            totalPrice: basketRecalculate.totalPrice,
            promotionPrice: basketRecalculate.promotionPrice,
            discount: basketRecalculate.discount,
            basket: basketRecalculate.items,
        }
    }

    async clearUserBasket(userId: string): Promise<BasketResp> {
        const userResp: UserResp = await this.userService.getOne(userId);
        if(!userResp.success) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`User (${userId}) not found`],
            }
        }
        await BasketsEntity.delete({
            user: userResp.users[0],
        });
        return {
            success: true,
            status: ResponseStatus.ok,
        }
    }

    async addToBasket(newBasket: AddToBasketDTO, userId: string): Promise<BasketResp> {
        const productResp: ProductsResp = await this.productsService.getOne(newBasket.productId);
        if (!productResp.success) return productResp;

        const userResp: UserResp = await this.userService.getOne(userId);
        if (!userResp.success) return userResp;


        const basketExists: BasketsEntity = await BasketsEntity.findOne({
            relations: ['product', 'user'],
            where:{
                user: userResp.users[0],
                product: productResp.items[0],
            }
        })
        if (basketExists) return await this.updateBasket(newBasket, basketExists);
        else return await this.createBasket(newBasket, userResp.users[0], productResp.items[0])
    }

    async updateBasket(newBasket: AddToBasketDTO, basketExists: BasketsEntity): Promise<BasketResp> {
        if (newBasket.count === undefined) newBasket.count = basketExists.count + 1;
        const availabilityResp = await this.availability(newBasket.count, basketExists.product);
        if (!availabilityResp.success) return availabilityResp;

        const basket = await BasketsEntity.update(basketExists.id, {
            count: newBasket.count,
            totalPrice: basketExists.product.promotionPrice * newBasket.count / 100,
            createdAt: new Date(),
        })

        if (basket) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: basketExists.id
            }
        }
    }

    async createBasket(newBasket: AddToBasketDTO, user: UserFilteredResp, product: ProductsEntity): Promise<BasketResp> {
        if (newBasket.count === undefined) newBasket.count = 1;
        const availabilityResp = await this.availability(newBasket.count, product);
        if (!availabilityResp.success) return availabilityResp;

        const basket = BasketsEntity.create({
            count: newBasket.count,
            totalPrice: product.promotionPrice * newBasket.count,
            user: user,
            product: product,
        });
        await basket.save();

        if (basket) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: basket.id,
            }
        }
    }

    async availability(count: number, product: ProductsEntity): Promise<BasketResp> {
        if (count > product.availability || count < 1 ) {
            return {
                success: false,
                status: ResponseStatus.notAcceptable,
                errors: [
                    'Count must be greater than zero and not greater than product availability',
                    `Count = ${count}`,
                    `Availability = ${product.availability}`,
                ],
            }
        } else {
            return {
                success: true,
                status: ResponseStatus.ok,
            }
        }
    }
}
