import { UsersEntity } from "../users/users.entity";
import { ProductsEntity } from "../products/products.entity";
import { ResponseStatus } from "./response-status";
import { OrdersItemsEntity } from "../orders/orders-items.entity";

export interface OrdersData {
    id: string,
    createdAt: Date;
    user: UsersEntity,
}

export interface OrdersItemsData {
    id: string,
    product: ProductsEntity,
    count: number,
}

export type OrderResp = {
    isSuccess: true,
    status: ResponseStatus,
    orderNumber?: string,
    count?: number,
    totalPrice?: number,
    orderItems?: OrdersItemsEntity[],
} | {
    isSuccess: false,
    status: ResponseStatus,
    errors: string[],
}