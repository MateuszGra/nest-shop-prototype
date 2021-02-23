import { ResponseStatus } from "./response-status";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersEntity } from "../orders/orders.entity";
import { DiscountCodesEntity } from "../discount-codes/discount-codes.entity";

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

export interface UserFilteredResp {
    id: string,
    name: string,
    surname: string,
    email: string,
    discountCode: DiscountCodesEntity,
    createdAt: Date,
    role: UsersRole,
    productsInBasket: BasketsEntity[],
    orders: OrdersEntity[],
}

export type UserResp = {
    success: true,
    status: ResponseStatus,
    users?: UserFilteredResp[],
    count?: number,
    id?: string,
} | {
    success: false,
    status: ResponseStatus,
    errors: string[],
}