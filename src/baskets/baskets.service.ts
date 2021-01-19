import { Inject, Injectable } from '@nestjs/common';
import { BasketsEntity } from "./baskets.entity";
import { AddToBasketDTO } from "./dto/add-to-basket";
import { ProductsService } from "../products/products.service";
import { UsersService } from "../users/users.service";
import { BasketResp } from "../interfaces/basket";
import { ProductsResp } from "../interfaces/products";
import { UserResp } from "../interfaces/users";
import { ResponseStatus } from "../interfaces/response-status";
import {UsersEntity} from "../users/users.entity";
import {ProductsEntity} from "../products/products.entity";

@Injectable()
export class BasketsService {
    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
        @Inject(UsersService) private userService: UsersService,
    ) {
    }


    async getUserBasket(userId: string): Promise<BasketResp> {
        const user: BasketResp = await this.userService.getOne(userId);
        if(!user.isSuccess){
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`User (${userId}) not found`],
            }
        }

        const [basket, count]: [BasketsEntity[], number] = await BasketsEntity.findAndCount({
            relations: ['product'],
            where: { user: userId }
        });
        const productsPrice = basket.map(item => item.product.price * item.count);
        const basketPrice = productsPrice.reduce((prev, curr) => prev + curr, 0);

        return {
            isSuccess: true,
            status: ResponseStatus.ok,
            count: count,
            totalPrice: Number(basketPrice.toFixed(2)),
            basket: basket,
        }
    }

    async clearUserBasket(userId: string): Promise<BasketResp> {
        const user: UserResp = await this.userService.getOne(userId);
        if(!user.isSuccess){
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`User (${userId}) not found`],
            }
        }
        await BasketsEntity.delete({
            user: user.users[0],
        });
        return {
            isSuccess: true,
            status: ResponseStatus.ok,
        }
    }

    async addToBasket(newBasket: AddToBasketDTO): Promise<BasketResp> {
        const productResp: ProductsResp = await this.productsService.getOne(newBasket.productId);
        if (!productResp.isSuccess) return productResp;
        if (newBasket.count > productResp.items[0].availability || newBasket.count < 1 ) {
            return {
                isSuccess: false,
                status: ResponseStatus.notAcceptable,
                errors: [
                    "Count must be greater than zero and not greater than product availability",
                    `Count = ${newBasket.count}`,
                    `Availability = ${productResp.items[0].availability}`,
                ],
            }
        }

        const userResp: UserResp = await this.userService.getOne(newBasket.userId);
        if (!userResp.isSuccess) return userResp;


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
        const basket = await BasketsEntity.update(basketExists.id, {
            count: newBasket.count,
            createdAt: new Date(),
        })
        if (basket) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                id: basketExists.id
            }
        }
    }

    async createBasket(newBasket: AddToBasketDTO, user: UsersEntity, product: ProductsEntity): Promise<BasketResp> {
        const basket = new BasketsEntity();
        basket.count = newBasket.count;
        basket.user = user;
        basket.product = product;
        await basket.save();

        if (basket) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                id: basket.id,
            }
        }
    }
}
