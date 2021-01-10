import { IsInt, IsUUID } from "class-validator";

export class AddToBasketDTO {
    @IsUUID()
    productId: string;
    @IsUUID()
    userId: string;
    @IsInt()
    count: number;
}