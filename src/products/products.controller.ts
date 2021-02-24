import {
    Get,
    Post,
    Inject,
    Body,
    Param,
    UseInterceptors,
    Put,
    ParseUUIDPipe,
    Query,
    UploadedFiles,
    Res
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { ProductFilters, ProductOrder, ProductsResp } from "../interfaces/products";
import { NewProductDTO } from "./dto/new-product.dto";
import { CacheInterceptor } from "../interceptors/cache.interceptor";
import { CacheTime } from "../decorators/cache-time.decorator";
import { EditProductsDTO } from "./dto/edit-products.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import * as path from 'path';
import { multerStorage, storageDir } from "../utils/storage";
import { MulterDiskUploadedFiles } from "../interfaces/files";

@Controller('products')
export class ProductsController {

    constructor(
        @Inject(ProductsService) private productsService: ProductsService,
    ) {
    }

    @Get('/')
    @UseInterceptors(CacheInterceptor)
    @CacheTime(10)
    async showAll(
        @Query('c') category: string,
        @Query('page') page: number,
        @Query('f') filter: ProductFilters,
        @Query('o') order: ProductOrder,
    ): Promise<ProductsResp> {
        return await this.productsService.getAll(page, category, filter, order);
    }

    @Get('/:id')
    async showOne(
        @Param('id') id: string,
    ): Promise<ProductsResp> {
        return await this.productsService.getOne(id);
    }

    @Post('/')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 10 },
            ], {storage: multerStorage(path.join(storageDir(), 'product-images'))},
        ),
    )
    async addNew(
        @Body() newProduct: NewProductDTO,
        @UploadedFiles() files: MulterDiskUploadedFiles,
    ): Promise<ProductsResp> {
        return await this.productsService.addOne(newProduct, files);
    }

    @Put('/:id')
    async edit (
        @Body() editProduct: EditProductsDTO,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ProductsResp> {
        return await this.productsService.editOne(editProduct, id);
    }

    @Get('/images/:id')
    async getPhoto(
        @Param('id') id: string,
        @Res() res: any,
    ): Promise<any> {
        return this.productsService.getPhoto(id, res);
    }
}
