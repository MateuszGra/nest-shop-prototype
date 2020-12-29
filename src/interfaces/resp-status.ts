import {ProductsData} from "./products";

export type RespStatus = {
    isSuccess: true,
    items?: ProductsData[],
    itemsCount?: number,
    pagesCount?: number,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}