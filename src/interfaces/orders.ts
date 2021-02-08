import { UsersEntity } from "../users/users.entity";
import { ProductsEntity } from "../products/products.entity";
import { ResponseStatus } from "./response-status";
import { OrdersItemsEntity } from "../orders/orders-items.entity";
import { OrdersEntity } from "../orders/orders.entity";

export interface OrdersData {
    id: string,
    createdAt: Date;
    user: UsersEntity,
    orderItems: OrdersItemsEntity[],
}

export interface OrdersItemsData {
    id: string,
    product: ProductsEntity,
    count: number,
    order: OrdersEntity,
}

export type OrderResp = {
    success: true,
    status: ResponseStatus,
    orderNumber?: string,
    count?: number,
    totalPrice?: number,
    orderItems?: OrdersItemsEntity[],
} | {
    success: false,
    status: ResponseStatus,
    errors: string[],
}