import { IsString, IsUUID, Length } from "class-validator";

export class AddDiscountCodeDTO {
    @IsUUID()
    userId: string;

    @IsString()
    @Length(2, 100)
    code: string;
}