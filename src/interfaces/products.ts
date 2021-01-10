import { ProductsEntity } from "../products/products.entity";
import { ResponseStatus } from "./response-status";

export interface ProductsData {
    name: string,
    id: string,
    availability: number,
    description: string,
    price: number,
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