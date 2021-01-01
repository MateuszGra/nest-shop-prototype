import { ProductsEntity } from "../products/products.entity";
import { UsersEntity } from "../users/users.entity";

export type RespStatus = {
    isSuccess: true,
    items?: ProductsEntity[],
    users?: UsersEntity[],
    count?: number,
    pagesCount?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}