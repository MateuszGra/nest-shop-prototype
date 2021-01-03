import { ProductsEntity } from "../products/products.entity";

export interface ProductsData {
    name: string,
    id: string,
    availability: number,
    description: string,
    price: number,
}

export type ProductsResp = {
    isSuccess: true,
    items?: ProductsEntity[],
    count?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
}