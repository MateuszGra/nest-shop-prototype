import { UsersEntity } from "../users/users.entity";
import { ResponseStatus } from "./response-status";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersEntity } from "../orders/orders.entity";

export enum UsersRole {
    user = 'user',
    guest = 'guest',
    admin = 'admin'
}

export interface UserData {
    id: string,
    name: string,
    surname: string,
    email: string,
    pwdHash: string,
    currentTokenId: string | null,
    createdAt: Date,
    role: UsersRole,
    productsInBasket: BasketsEntity[],
    orders: OrdersEntity[],
}

export type UserResp = {
    success: true,
    status: ResponseStatus,
    users?: UsersEntity[],
    count?: number,
    id?: string,
} | {
    success: false,
    status: ResponseStatus,
    errors: string[],
}