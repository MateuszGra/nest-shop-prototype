import { Injectable } from '@nestjs/common';
import { RespStatus } from "../interfaces/resp-status";
import { ProductsEntity } from "./products.entity";

@Injectable()
export class ProductsService {
    async getAll(): Promise<RespStatus> {
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

    async getOne(id: string): Promise<RespStatus> {
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

    async addOne(newProduct: ProductsEntity): Promise<RespStatus> {
        const product: ProductsEntity = await ProductsEntity.save(newProduct);
        return {
            isSuccess: true,
            id: product.id,
        }
    }
}
