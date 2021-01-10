import {Body, Controller, Inject, Param, Post, Get, Delete, ParseUUIDPipe} from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket";
import { BasketService } from "./basket.service";
import { BasketResp } from "../interfaces/basket";


@Controller('basket')
export class BasketController {

    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Get('/:userId')
    async getOne(
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<BasketResp> {
        return await this.basketService.getUserBasket(userId);
    }

    @Post('/')
    async addNew(
        @Body() newBasket: AddToBasketDTO,
    ): Promise<BasketResp> {
        return await this.basketService.addToBasket(newBasket);
    }

    @Delete('/:userId')
    async clear(
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<BasketResp> {
        return await this.basketService.clearUserBasket(userId);
    }
}
