import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddToBasketDTO } from "./dto/add-to-basket";
import { RespStatus } from "../interfaces/resp-status";
import { BasketService } from "./basket.service";


@Controller('basket')
export class BasketController {

    constructor(
        @Inject(BasketService) private basketService: BasketService,
    ) {
    }

    @Post('/')
    async addNew(
        @Body() newBasket: AddToBasketDTO,
    ): Promise<RespStatus> {
        return await this.basketService.addToBasket(newBasket);
    }
}
