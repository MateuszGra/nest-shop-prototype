import { ProductsEntity } from "../products/products.entity";
import { UsersEntity } from "../users/users.entity";
import {BasketEntity} from "../basket/basket.entity";

export type RespStatus = {
    isSuccess: true,
    items?: ProductsEntity[],
    users?: UsersEntity[],
    basket?: BasketEntity[],
    count?: number,
    pagesCount?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}