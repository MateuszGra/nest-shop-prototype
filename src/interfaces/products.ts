import { ProductsEntity } from "../products/products.entity";
import { ResponseStatus } from "./response-status";
import { BaseEntity } from "typeorm";
import { OrdersItemsEntity } from "../orders/orders-items.entity";

export interface ProductsData {
    name: string,
    id: string,
    availability: number,
    description: string,
    price: number,
    sold: number,
    promotion: number,
    promotionPrice: number,
    basket: BaseEntity[],
    orders: OrdersItemsEntity[],
}

export interface RecalculateData {
    totalPrice: number,
    items: [],
}

export type ProductsResp = {
    isSuccess: true,
    status: ResponseStatus,
    items?: ProductsEntity[],
    count?: number,
    id?: string,
} | {
    isSuccess: false,
    status: ResponseStatus,
    errors: string[],
}