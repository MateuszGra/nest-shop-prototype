import {IsString, IsUUID, Length} from "class-validator";

export class addDiscountCodeDTO {
    @IsUUID()
    userId: string;

    @IsString()
    @Length(2, 100)
    code: string;
}