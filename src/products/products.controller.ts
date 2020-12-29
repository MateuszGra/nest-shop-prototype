import { Get, Post, Inject, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RespStatus } from "../interfaces/resp-status";
import { ProductsService } from "./products.service";
import { ProductsEntity } from "./products.entity";

@Controller('products')
export class ProductsController {

    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
    ) {
    }

    @Get('/')
    async showAll(): Promise<RespStatus> {
        return await this.productsService.getAll();
    }

    @Post('/')
    async addNew(
        @Body() newProduct: ProductsEntity,
    ): Promise<RespStatus> {
        return await this.productsService.addOne(newProduct);
    }
}
