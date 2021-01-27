import { Inject, Injectable } from '@nestjs/common';
import { OrderResp, OrdersRecalculateData } from "../interfaces/orders";
import { ResponseStatus } from "../interfaces/response-status";
import { OrdersEntity } from "./orders.entity";
import { UserResp } from "../interfaces/users";
import { UsersService } from "../users/users.service";
import { BasketsService } from "../baskets/baskets.service";
import { BasketResp } from "../interfaces/basket";
import { MailService } from "../mail/mail.service";
import { orderEmailTemplate } from "../templates/email/order";
import { OrdersItemsEntity } from "./orders-items.entity";

@Injectable()
export class OrdersService {
    constructor(
        @Inject(UsersService) private userService: UsersService,
        @Inject(BasketsService) private basketService: BasketsService,
        @Inject(MailService) private mailService: MailService,
    ) {
    }

    async getOneByOrderNumber(id: string): Promise<OrderResp> {
        const order: OrdersEntity = await OrdersEntity.findOne({
            relations: ['orderItems', 'orderItems.product'],
            where: { id }
        })

        if (order) {
            const orderRecalculate = await this.priceRecalculate(order.orderItems)
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                orderNumber: order.id,
                count: order.orderItems.length,
                totalPrice: orderRecalculate.totalPrice,
                orderItems: order.orderItems,
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.ok,
                errors: [`Order (${id}) not found`],
            }
        }
    }

    async addOne(userId: string): Promise<OrderResp> {
        const userResp: UserResp = await this.userService.getOne(userId);
        if (!userResp.isSuccess) return userResp;

        const basketResp: BasketResp = await this.basketService.getUserBasket(userId);
        if (!basketResp.isSuccess) return basketResp;
        if (basketResp.basket.length === 0 ) {
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: ['Basket is empty'],
            }
        }

        const order: OrdersEntity = OrdersEntity.create({
            user: userResp.users[0],
        })
        await order.save();

        for await (const basket of basketResp.basket) {
            if (basket.count > 0) {
                const orderItem = OrdersItemsEntity.create({
                    count: basket.count,
                    product: basket.product,
                    order: order,
                });
                await orderItem.save();
            }
        }

        await this.mailService.sendMail(
            userResp.users[0].email,
            'Potwierdzenie zamówienia',
            orderEmailTemplate(await this.getOneByOrderNumber(order.id))
        )

        await this.basketService.clearUserBasket(userId);

        return {
            isSuccess: true,
            status: ResponseStatus.ok,
            orderNumber: order.id,
        }
    }

    async priceRecalculate(order: OrdersItemsEntity[]): Promise<OrdersRecalculateData> {
        await order.forEach(item => item.product.price = item.product.price / 100)

        const productPrice = await order.map(item => item.product.price * item.count);
        const totalPrice = await productPrice.reduce((prev, curr) => prev + curr, 0);

        return {
            totalPrice: totalPrice,
            items: order,
        }
    }
}
