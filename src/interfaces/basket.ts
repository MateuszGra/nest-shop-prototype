import { ProductsEntity } from "../products/products.entity";
import { UsersEntity } from "../users/users.entity";

export interface BasketData {
    id: string,
    user: UsersEntity,
    product: ProductsEntity,
    count: number,
}