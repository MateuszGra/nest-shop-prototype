import { Body, Controller, Inject, Post, Get, Delete, UseGuards } from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket.dto";
import { BasketsService } from "./baskets.service";
import { BasketResp } from "../interfaces/basket";
import { AuthGuard } from "@nestjs/passport";
import { UsersEntity } from "../users/users.entity";
import { UserObj } from "../decorators/user-obj.decorator";


@Controller('baskets')
export class BasketsController {

    constructor(
        @Inject(BasketsService) private basketService: BasketsService,
    ) {
    }

    @Get('/')
    @UseGuards(AuthGuard('jwt'))
    async getOne(
        @UserObj() user: UsersEntity,
    ): Promise<BasketResp> {
        return await this.basketService.getUserBasket(user);
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    async addNew(
        @UserObj() user: UsersEntity,
        @Body() newBasket: AddToBasketDTO,
    ): Promise<BasketResp> {
        return await this.basketService.addToBasket(newBasket, user);
    }

    @Delete('/')
    @UseGuards(AuthGuard('jwt'))
    async clear(
        @UserObj() user: UsersEntity,
    ): Promise<BasketResp> {
        return await this.basketService.clearUserBasket(user);
    }
}
