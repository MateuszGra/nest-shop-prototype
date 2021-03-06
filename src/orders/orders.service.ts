import { Inject, Injectable } from '@nestjs/common';
import { OrderResp } from "../interfaces/orders";
import { ResponseStatus } from "../interfaces/response-status";
import { OrdersEntity } from "./orders.entity";
import { UsersService } from "../users/users.service";
import { BasketsService } from "../baskets/baskets.service";
import { BasketResp } from "../interfaces/basket";
import { MailService } from "../mail/mail.service";
import { orderEmailTemplate } from "../templates/email/order";
import { OrdersItemsEntity } from "./orders-items.entity";
import { ProductsService } from "../products/products.service";
import { DiscountCodesService } from "../discount-codes/discount-codes.service";
import { UsersEntity } from "../users/users.entity";

@Injectable()
export class OrdersService {
    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
        @Inject(UsersService) private userService: UsersService,
        @Inject(BasketsService) private basketService: BasketsService,
        @Inject(MailService) private mailService: MailService,
        @Inject(DiscountCodesService) private discountCodesService: DiscountCodesService,
    ) {
    }

    async getOneByOrderNumber(id: string): Promise<OrderResp> {
        const order: OrdersEntity = await OrdersEntity.findOne({
            relations: ['orderItems', 'orderItems.product'],
            where: { id }
        })

        if (order) {
            return {
                success: true,
                status: ResponseStatus.ok,
                orderNumber: order.id,
                count: order.orderItems.length,
                totalPrice: order.totalPrice,
                promotionPrice: order.promotionPrice,
                discount: order.discount,
                orderItems: order.orderItems,
            }
        } else {
            return {
                success: false,
                status: ResponseStatus.ok,
                errors: [`Order (${id}) not found`],
            }
        }
    }

    async addOne(user: UsersEntity): Promise<OrderResp> {
        const basketResp: BasketResp = await this.basketService.getUserBasket(user);
        if (!basketResp.success) return basketResp;
        if (basketResp.basket.length === 0 ) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: ['Basket is empty'],
            }
        }

        const order: OrdersEntity = OrdersEntity.create({
            user: user,
            totalPrice: basketResp.totalPrice,
            promotionPrice: basketResp.promotionPrice,
            discount: basketResp.discount,
        })
        await order.save();

        for await (const basket of basketResp.basket) {
            if (basket.count > 0) {
                const orderItem = OrdersItemsEntity.create({
                    count: basket.count,
                    totalPrice: basket.totalPrice,
                    promotion: basket.product.promotion,
                    price: basket.product.price,
                    product: basket.product,
                    promotionPrice: basket.product.promotionPrice,
                    order: order,
                });
                await orderItem.save();
                await this.productsService.soldUpdate(basket.count, basket.product);
            }
        }

        await this.mailService.sendMail(
            user.email,
            'Potwierdzenie zamówienia',
            orderEmailTemplate(await this.getOneByOrderNumber(order.id))
        )

        console.log(user)
        if (user.discountCode !== null && user.discountCode.oneTime) {
            await this.discountCodesService.switchAvailableToFalse(user.discountCode);
        }
        await this.basketService.clearUserBasket(user);

        return {
            success: true,
            status: ResponseStatus.ok,
            orderNumber: order.id,
        }
    }
}
