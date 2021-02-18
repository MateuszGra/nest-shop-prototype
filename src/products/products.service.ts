import { Inject, Injectable } from '@nestjs/common';
import { ProductsEntity } from "./products.entity";
import { ProductFilters, ProductOrder, ProductsResp, RecalculateData } from "../interfaces/products";
import { ResponseStatus } from "../interfaces/response-status";
import { NewProductDTO } from "./dto/new-product";
import { DiscountCodesService } from "../discount-codes/discount-codes.service";
import { BasketsEntity } from "../baskets/baskets.entity";
import { EditProductsDTO } from "./dto/edit-products";
import { MulterDiskUploadedFiles } from "../interfaces/files";
import { ProductsImagesEntity } from "./products-images.entity";

@Injectable()
export class ProductsService {
    constructor(
        @Inject(DiscountCodesService) private discountCodesService: DiscountCodesService,
    ) {
    }

    async getAll(page: number = 1, category: string, filter: ProductFilters, order: ProductOrder): Promise<ProductsResp> {
        const maxPerPage = 3;
        const orders = {};
        if(order && filter) orders[filter] = order.toUpperCase();
        else orders['promotion'] = ProductOrder.asc;

        const where = {}
        if (category) where['category'] = category

        const [items, count]: [ProductsEntity[], number] = await ProductsEntity.findAndCount({
            skip: maxPerPage * (page - 1),
            take: maxPerPage,
            where: where,
            order: orders,
        });

        if (items.length > 0) {
            const pagesCount = Math.ceil(count / maxPerPage);
            items.forEach(item => item = this.itemPriceRecalculate(item))

            return {
                success: true,
                status: ResponseStatus.ok,
                count: count,
                pagesCount: pagesCount,
                items: items,
            }
        } else {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`Not found`],
            }
        }
    }

    async getOne(id: string): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.findOne(id);
        if (product) {
            const productRecalculate = this.itemPriceRecalculate(product);
            return {
                success: true,
                status: ResponseStatus.ok,
                items: [productRecalculate],
            }
        } else {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`Product (${id}) not found`],
            }
        }
    }

    async addOne(newProduct: NewProductDTO, files: MulterDiskUploadedFiles): Promise<ProductsResp> {
        newProduct.price = newProduct.price * 100;
        const product = new ProductsEntity();
        Object.assign(product, newProduct);
        product.sold = 0;

        if(product.promotion > 0) product.promotionPrice = Math.floor(product.price * product.promotion / 100);
        else product.promotionPrice = product.price;

        await product.save();

        if (files.images[0]) {
            const images = ProductsImagesEntity.create({
                imageFn: files.images[0].filename,
                product: product,
            })
             await images.save();
        }

        if (product) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: product.id,
            }
        }
    }

    async priceRecalculate(products: BasketsEntity[], discountCodeNumber?: string): Promise<RecalculateData> {
        const productPrice = await products.map(item => item.product.promotionPrice * item.count);
        const totalPrice = await productPrice.reduce((prev, curr) => prev + curr, 0);
        await products.forEach(item => item.product = this.itemPriceRecalculate(item.product))
        let promotionalPrice = totalPrice;
        let discount = 0;

        if (discountCodeNumber) {
            const discountCodeResp = await this.discountCodesService.getOne(discountCodeNumber);
            if (discountCodeResp.success && discountCodeResp.upToDate) {
                discount = discountCodeResp.codes[0].promotion;
                promotionalPrice = Math.floor(totalPrice - (totalPrice * discount / 100));
            }

        }

        return {
            totalPrice: totalPrice / 100,
            promotionPrice: promotionalPrice / 100,
            discount: discount,
            items: products,
        }
    }

    itemPriceRecalculate(product: ProductsEntity): ProductsEntity {
        product.price = product.price / 100;
        product.promotionPrice = product.promotionPrice / 100;

        return product;
    }

    async soldUpdate(count: number, product: ProductsEntity) {
       await ProductsEntity.update(product.id, {
            availability: product.availability - count,
            sold: product.sold + count,
       })
    }

    async editOne(editProduct: EditProductsDTO, id: string): Promise<ProductsResp> {
        const UpdateResult = await ProductsEntity.update(id, editProduct);
        if (UpdateResult.affected === 0) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`Product (${id}) not found`],
            }
        }

        return {
            success: true,
            status: ResponseStatus.ok,
        }
    }
}
