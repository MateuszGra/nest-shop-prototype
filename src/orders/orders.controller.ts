import {Controller, Get, Inject, Param} from '@nestjs/common';
import { OrdersService } from "./orders.service";
import {OrderResp} from "../interfaces/orders";

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(OrdersService) private ordersService: OrdersService,
    ) {
    }

    @Get('/:orderNumber')
    async showOneByOrderNumber(
        @Param('orderNumber') orderNumber: string,
    ): Promise<OrderResp> {
        return await this.ordersService.getOneByOrderNumber(orderNumber);
    }


}
