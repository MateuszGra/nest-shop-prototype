import { Get, Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {RespStatus} from "../interfaces/resp-status";
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {

    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
    ) {
    }

    @Get('/')
    async showProducts(): Promise<RespStatus> {
        return await this.productsService.getAll();
    }
}
