import { ProductsEntity } from "../products/products.entity";
import { UsersEntity } from "../users/users.entity";
import { BasketEntity } from "../basket/basket.entity";

export interface BasketData {
    id: string,
    user: UsersEntity,
    product: ProductsEntity,
    count: number,
}

export type BasketResp = {
    isSuccess: true,
    basket?: BasketEntity[],
    count?: number,
    totalPrice?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
}