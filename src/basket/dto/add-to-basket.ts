import {IsInt, IsUUID, Max, Min} from "class-validator";

export class AddToBasketDTO {
    @IsUUID()
    productId: string;
    @IsUUID()
    userId: string;
    @IsInt()
    count: number;
}