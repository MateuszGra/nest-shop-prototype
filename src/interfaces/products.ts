import { ProductsEntity } from "../products/products.entity";
import { ResponseStatus } from "./response-status";
import { BaseEntity } from "typeorm";
import { OrdersItemsEntity } from "../orders/orders-items.entity";
import { BasketsEntity } from "../baskets/baskets.entity";
import { ProductsImagesEntity } from "../products/products-images.entity";

export interface ProductsData {
    name: string,
    category: string;
    id: string,
    availability: number,
    description: string,
    price: number,
    sold: number,
    promotion: number,
    promotionPrice: number,
    images: ProductsImagesEntity[],
    basket: BaseEntity[],
    orders: OrdersItemsEntity[],
}

export interface RecalculateData {
    totalPrice: number,
    promotionPrice: number,
    discount: number,
    items: BasketsEntity[],
}

export enum ProductFilters {
    promotionPrice = 'promotionPrice',
    promotion = 'promotion',
    availability = 'availability',
    sold = 'sold',
}

export enum ProductOrder {
    asc = 'ASC',
    desc = 'DESC',
}

export type ProductsResp = {
    success: true,
    status: ResponseStatus,
    items?: ProductsEntity[],
    count?: number,
    pagesCount?: number,
    id?: string,
} | {
    success: false,
    status: ResponseStatus,
    errors: string[],
}