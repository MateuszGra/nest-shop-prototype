import {Body, Controller, Inject, Param, Post, Get, Delete} from '@nestjs/common';
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
    async getOne(
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

    @Delete('/:userId')
    async clear(
        @Param('userId') userId: string,
    ): Promise<RespStatus> {
        return await this.basketService.clearUserBasket(userId);
    }
}
