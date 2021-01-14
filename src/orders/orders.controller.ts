import {Controller, Get, Inject, Param, ParseUUIDPipe, Post} from '@nestjs/common';
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
        @Param('orderNumber', ParseUUIDPipe) orderNumber: string,
    ): Promise<OrderResp> {
        return await this.ordersService.getOneByOrderNumber(orderNumber);
    }

    @Post('/:userId')
    async addNew(
        @Param('userId', ParseUUIDPipe) userId: string
    ): Promise<OrderResp> {
        return await this.ordersService.addOne(userId);
    }
}
