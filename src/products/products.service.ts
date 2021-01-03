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
                count: count,
                items: items,
            }
        } else {
            return {
                isSuccess: false,
                errors: ["Empty"],
            }
        }
    }

    async getOne(id: string): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.findOne(id);
        if (product) {
            return {
                isSuccess: true,
                items: [product],
            }
        } else {
            return {
                isSuccess: false,
                errors: [`Product (${id}) not found`],
            }
        }
    }

    async register(newProduct: ProductsEntity): Promise<ProductsResp> {
        const product: ProductsEntity = await ProductsEntity.save(newProduct);
        return {
            isSuccess: true,
            id: product.id,
        }
    }
}
