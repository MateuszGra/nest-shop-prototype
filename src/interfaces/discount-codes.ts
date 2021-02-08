import { ResponseStatus } from "./response-status";
import { DiscountCodesEntity } from "../discount-codes/discount-codes.entity";

export interface DiscountCodesData {
    id: string;
    code: string;
    promotion: number;
    startDate: Date;
    endDate: Date;
    oneTime: boolean;
}

export type DiscountCodesResp = {
    success: true,
    status: ResponseStatus,
    codes?: DiscountCodesEntity[],
    id?: string,
} | {
    success: false,
    status: ResponseStatus,
    errors: string[],
}