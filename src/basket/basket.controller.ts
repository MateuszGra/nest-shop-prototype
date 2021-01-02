import {Body, Controller, Inject, Param, Post, Get} from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket";
import { RespStatus } from "../interfaces/resp-status";
import { BasketService } from "./basket.service";


@Controller('basket')
export class BasketController {

    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Get('/:userId')
    async getBasket(
        @Param('userId') userId: string,
    ): Promise<RespStatus> {
        return await this.basketService.getUserBasket(userId);
    }

    @Post('/')
    async addNew(
        @Body() newBasket: AddToBasketDTO,
    ): Promise<RespStatus> {
        return await this.basketService.addToBasket(newBasket);
    }
}
