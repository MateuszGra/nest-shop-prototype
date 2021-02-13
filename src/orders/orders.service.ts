import { Inject, Injectable } from '@nestjs/common';
import { OrderResp } from "../interfaces/orders";
import { ResponseStatus } from "../interfaces/response-status";
import { OrdersEntity } from "./orders.entity";
import { UserResp } from "../interfaces/users";
import { UsersService } from "../users/users.service";
import { BasketsService } from "../baskets/baskets.service";
import { BasketResp } from "../interfaces/basket";
import { MailService } from "../mail/mail.service";
import { orderEmailTemplate } from "../templates/email/order";
import { OrdersItemsEntity } from "./orders-items.entity";
import { ProductsService } from "../products/products.service";
import { DiscountCodesService } from "../discount-codes/discount-codes.service";

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

    async addOne(userId: string): Promise<OrderResp> {
        const userResp: UserResp = await this.userService.getOne(userId);
        if (!userResp.success) return userResp;

        const basketResp: BasketResp = await this.basketService.getUserBasket(userId);
        if (!basketResp.success) return basketResp;
        if (basketResp.basket.length === 0 ) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: ['Basket is empty'],
            }
        }

        const order: OrdersEntity = OrdersEntity.create({
            user: userResp.users[0],
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
            userResp.users[0].email,
            'Potwierdzenie zamówienia',
            orderEmailTemplate(await this.getOneByOrderNumber(order.id))
        )

        if (userResp.users[0].discountCode !== null && userResp.users[0].discountCode.oneTime) {
            await this.discountCodesService.switchAvailableToFalse(userResp.users[0].discountCode);
        }
        await this.basketService.clearUserBasket(userId);

        return {
            success: true,
            status: ResponseStatus.ok,
            orderNumber: order.id,
        }
    }
}
