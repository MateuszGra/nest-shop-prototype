import { ProductsEntity } from "../products/products.entity";
import { UserData } from "./users";
import { ProductsData } from "./products";

export interface BasketData {
    id: string,
    user: UserData,
    product: ProductsData,
    count: number,
}