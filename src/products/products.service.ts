import { Injectable } from '@nestjs/common';
import { ProductsEntity } from "./products.entity";
import { ProductsResp } from "../interfaces/products";
import { ResponseStatus } from "../interfaces/response-status";

@Injectable()
export class ProductsService {
    async getAll(): Promise<ProductsResp> {
        const [items, count]: [ProductsEntity[], number] = await ProductsEntity.findAndCount({
            order: {
                price: "ASC",
            },
        });
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

    async addOne(newProduct: ProductsEntity): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.save(newProduct);
        return {
            isSuccess: true,
            status: ResponseStatus.ok,
            id: product.id,
        }
    }
}
