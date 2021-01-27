import { IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";

export class AddToBasketDTO {
    @IsUUID()
    productId: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(999999)
    count: number;
}