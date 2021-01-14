import { Injectable } from '@nestjs/common';
import { OrderResp } from "../interfaces/orders";
import { ResponseStatus } from "../interfaces/response-status";
import { OrdersEntity } from "./orders.entity";

@Injectable()
export class OrdersService {
    async getOneByOrderNumber(orderNumber): Promise<OrderResp> {
        const [order, count]: [OrdersEntity[], number] = await OrdersEntity.findAndCount({
            where: {
                orderNumber
            }
        });
        if (order.length > 0) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                count: count,
                order: order,
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.ok,
                errors: ["Empty"],
            }
        }
    }
}
