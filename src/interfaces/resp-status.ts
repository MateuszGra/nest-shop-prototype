import {ProductsData} from "./products";
import {UserData} from "./users";

export type RespStatus = {
    isSuccess: true,
    items?: ProductsData[],
    users?: UserData[],
    count?: number,
    pagesCount?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}