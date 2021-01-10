import { Get, Post, Inject, Body, Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { ProductsResp } from "../interfaces/products";
import { newProductDTO } from "./dto/new-product";

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
        @Param('id') id: string,
    ): Promise<ProductsResp> {
        return await this.productsService.getOne(id);
    }

    @Post('/')
    async addNew(
        @Body() newProduct: newProductDTO,
    ): Promise<ProductsResp> {
        return await this.productsService.addOne(newProduct);
    }
}
