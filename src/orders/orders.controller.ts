import { Controller, Inject } from '@nestjs/common';
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(OrdersService) private ordersService: OrdersService,
    ) {

    }
}
