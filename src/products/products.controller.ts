import {Get, Post, Inject, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { ProductsEntity } from "./products.entity";
import { ProductsResp } from "../interfaces/products";

@Controller('products')
export class ProductsController {

    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
    ) {
    }

    @Get('/')
    async showAll(): Promise<ProductsResp> {
        return await this.productsService.getAll();
    }

    @Get('/:id')
    async showOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ProductsResp> {
        return await this.productsService.getOne(id);
    }

    @Post('/')
    async addNew(
        @Body() newProduct: ProductsEntity,
    ): Promise<ProductsResp> {
        return await this.productsService.addOne(newProduct);
    }
}
