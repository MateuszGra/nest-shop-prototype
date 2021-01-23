import { Controller, Get, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from "./orders.service";
import { OrderResp } from "../interfaces/orders";

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(OrdersService) private ordersService: OrdersService,
    ) {
    }

    @Get('/:id')
    async showOneByOrderNumber(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<OrderResp> {
        return await this.ordersService.getOneByOrderNumber(id);
    }

    @Post('/:userId')
    async addNew(
        @Param('userId', ParseUUIDPipe) userId: string
    ): Promise<OrderResp> {
        return await this.ordersService.addOne(userId);
    }
}
