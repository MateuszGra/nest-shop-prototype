import {Body, Controller, Inject, Param, Post, Get, Delete, ParseUUIDPipe} from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket";
import { BasketsService } from "./baskets.service";
import { BasketResp } from "../interfaces/basket";


@Controller('baskets')
export class BasketsController {

    constructor(
        @Inject(BasketsService) private basketService: BasketsService,
    ) {
    }

    @Get('/:userId')
    async getOne(
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<BasketResp> {
        return await this.basketService.getUserBasket(userId);
    }

    @Post('/:userId')
    async addNew(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Body() newBasket: AddToBasketDTO,
    ): Promise<BasketResp> {
        return await this.basketService.addToBasket(newBasket, userId);
    }

    @Delete('/:userId')
    async clear(
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<BasketResp> {
        return await this.basketService.clearUserBasket(userId);
    }
}
