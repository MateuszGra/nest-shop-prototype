import { Injectable } from '@nestjs/common';
import { ProductsEntity } from "./products.entity";
import { ProductsResp, RecalculateData } from "../interfaces/products";
import { ResponseStatus } from "../interfaces/response-status";
import { newProductDTO } from "./dto/new-product";

@Injectable()
export class ProductsService {
    async getAll(): Promise<ProductsResp> {
        const [items, count]: [ProductsEntity[], number] = await ProductsEntity.findAndCount({
            order: {
                price: "ASC",
            },
        });
        await items.forEach(item => item.price = item.price / 100);

        if (items.length > 0) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                count: count,
                items: items,
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.ok,
                errors: ["Empty"],
            }
        }
    }

    async getOne(id: string): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.findOne(id);
        if (product) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                items: [product],
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`Product (${id}) not found`],
            }
        }
    }

    async addOne(newProduct: newProductDTO): Promise<ProductsResp> {
        newProduct.price = newProduct.price * 100;
        const product = new ProductsEntity();
        Object.assign(product, newProduct);
        product.sold = 0;
        await product.save();

        if (product) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                id: product.id,
            }
        }
    }

    async priceRecalculate(products): Promise<RecalculateData> {
        const productPrice = await products.map(item => item.product.price * item.count);
        const totalPrice = await productPrice.reduce((prev, curr) => prev + curr, 0);
        await products.forEach(item => item.product.price = item.product.price / 100)

        return {
            totalPrice: totalPrice / 100,
            items: products,
        }
    }

    async soldUpdate(count: number, product: ProductsEntity) {
       await ProductsEntity.update(product.id, {
            availability: product.availability - count,
            sold: product.sold + count,
       })
    }
}
