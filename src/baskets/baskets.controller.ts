import {Body, Controller, Inject, Param, Post, Get, Delete, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket.dto";
import { BasketsService } from "./baskets.service";
import { BasketResp } from "../interfaces/basket";
import {AuthGuard} from "@nestjs/passport";
import {UsersEntity} from "../users/users.entity";
import {UserObj} from "../decorators/user-obj.decorator";


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

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async addNew(
        @UserObj() user: UsersEntity,
        @Body() newBasket: AddToBasketDTO,
    ): Promise<BasketResp> {
        return await this.basketService.addToBasket(newBasket, user.id);
    }

    @Delete('/:userId')
    async clear(
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<BasketResp> {
        return await this.basketService.clearUserBasket(userId);
    }
}
