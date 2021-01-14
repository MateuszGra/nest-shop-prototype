import { Inject, Injectable } from '@nestjs/common';
import { OrderResp } from "../interfaces/orders";
import { ResponseStatus } from "../interfaces/response-status";
import { OrdersEntity } from "./orders.entity";
import { UserResp } from "../interfaces/users";
import { UsersService } from "../users/users.service";
import { ProductsService } from "../products/products.service";
import { BasketService } from "../basket/basket.service";
import { BasketResp } from "../interfaces/basket";
import { ProductsResp } from "../interfaces/products";
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
        @Inject(UsersService) private userService: UsersService,
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    async getOneByOrderNumber(orderNumber: string): Promise<OrderResp> {
        const [order, count]: [OrdersEntity[], number] = await OrdersEntity.findAndCount({
            relations: ['product'],
            where: {
                orderNumber
            }
        });
        if (order.length > 0) {
            const productsPrice = order.map(item => item.product.price * item.count);
            const orderPrice = productsPrice.reduce((prev, curr) => prev + curr, 0);
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                count: count,
                totalPrice: Number(orderPrice.toFixed(2)),
                order: order,
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.ok,
                errors: [`Order (${orderNumber}) not found`],
            }
        }
    }

    async addOne(userId: string): Promise<OrderResp> {
        const userResp: UserResp = await this.userService.getOne(userId);
        if (!userResp.isSuccess) {
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`User (${userId}) not found`],
            }
        }

        const basketResp: BasketResp = await this.basketService.getUserBasket(userId);
        if (!basketResp.isSuccess) {
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`User basket (${userId}) is empty`],
            }
        }

        const date = new Date();
        const orderNumber = uuid();
        for await (const basket of basketResp.basket) {
            const productResp: ProductsResp = await this.productsService.getOne(basket.product.id);
            if(productResp.isSuccess) {
                const order = new OrdersEntity();
                order.count = basket.count;
                order.createdAt = date;
                order.orderNumber = orderNumber;
                order.product = productResp.items[0];
                order.user = userResp.users[0];
                await order.save();
            }
        }
        await this.basketService.clearUserBasket(userId);

        return {
            isSuccess: true,
            status: ResponseStatus.ok,
            orderNumber: orderNumber,
        }
    }
}
