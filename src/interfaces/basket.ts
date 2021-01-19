import { ProductsEntity } from "../products/products.entity";
import { UsersEntity } from "../users/users.entity";
import { BasketsEntity } from "../baskets/baskets.entity";
import { ResponseStatus } from "./response-status";

export interface BasketData {
    id: string,
    user: UsersEntity,
    product: ProductsEntity,
    count: number,
    createdAt: Date;
}

export type BasketResp = {
    isSuccess: true,
    status: ResponseStatus,
    basket?: BasketsEntity[],
    count?: number,
    totalPrice?: number,
    id?: string,
} | {
    isSuccess: false,
    status: ResponseStatus,
    errors: string[],
}