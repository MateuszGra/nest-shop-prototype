import { UsersEntity } from "../users/users.entity";
import {ProductsEntity} from "../products/products.entity";
import {ResponseStatus} from "./response-status";

export interface OrdersData {
    id: string,
    orderNumber: string,
    createdAt: Date;
    user: UsersEntity,
    product: ProductsEntity,
    count: number,
}

export type OrderResp = {
    isSuccess: true,
    status: ResponseStatus,
    orderNumber?: string,
    count?: number,
    totalPrice?: number,
    order: any,
} | {
    isSuccess: false,
    status: ResponseStatus,
    errors: string[],
}