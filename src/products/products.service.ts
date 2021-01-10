import { Injectable } from '@nestjs/common';
import { ProductsEntity } from "./products.entity";
import {ProductsResp} from "../interfaces/products";

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
                status: 200,
                count: count,
                items: items,
            }
        } else {
            return {
                isSuccess: false,
                status: 200,
                errors: ["Empty"],
            }
        }
    }

    async getOne(id: string): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.findOne(id);
        if (product) {
            return {
                isSuccess: true,
                status: 200,
                items: [product],
            }
        } else {
            return {
                isSuccess: false,
                status: 404,
                errors: [`Product (${id}) not found`],
            }
        }
    }

    async addOne(newProduct: ProductsEntity): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.save(newProduct);
        return {
            isSuccess: true,
            status: 200,
            id: product.id,
        }
    }
}
