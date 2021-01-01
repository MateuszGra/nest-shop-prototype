import { Injectable } from '@nestjs/common';
import {RespStatus} from "../interfaces/resp-status";
import {ProductsData} from "../interfaces/products";
import {ProductsEntity} from "./products.entity";

@Injectable()
export class ProductsService {
    async getAll(): Promise<RespStatus> {
        const [items, count]: [ProductsData[], number] = await ProductsEntity.findAndCount({
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

    async addOne(newProduct: ProductsEntity): Promise<RespStatus> {
        const product: ProductsEntity = await ProductsEntity.save(newProduct);
        return {
            isSuccess: true,
            id: product.id,
        }
    }
}
