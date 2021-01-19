import {IsInt, IsOptional, IsUUID} from "class-validator";

export class AddToBasketDTO {
    @IsUUID()
    productId: string;

    @IsUUID()
    userId: string;

    @IsOptional()
    @IsInt()
    count: number;
}