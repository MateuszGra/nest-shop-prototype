import {Get, Post, Inject, Body, Param, UseInterceptors, Put, ParseUUIDPipe} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { ProductsResp } from "../interfaces/products";
import { NewProductDTO } from "./dto/new-product";
import { CacheInterceptor } from "../interceptors/cache.interceptor";
import { CacheTime } from "../decorators/cache-time.decorator";
import {EditProductsDTO} from "./dto/edit-products";

@Controller('products')
export class ProductsController {

    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
    ) {
    }

    @Get('/')
    @UseInterceptors(CacheInterceptor)
    @CacheTime(10)
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
        @Body() newProduct: NewProductDTO,
    ): Promise<ProductsResp> {
        return await this.productsService.addOne(newProduct);
    }

    @Put('/:id')
    async edit (
        @Body() editProduct: EditProductsDTO,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ProductsResp> {
        return await this.productsService.editOne(editProduct, id);
    }
}
