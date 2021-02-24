import { Controller, Get, Inject, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from "./orders.service";
import { OrderResp } from "../interfaces/orders";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { UsersEntity } from "../users/users.entity";

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

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async addNew(
        @UserObj() user: UsersEntity,
    ): Promise<OrderResp> {
        return await this.ordersService.addOne(user);
    }
}
