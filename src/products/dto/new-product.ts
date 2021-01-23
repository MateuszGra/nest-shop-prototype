import { IsInt, IsNumber, IsString, Length } from "class-validator";

export class newProductDTO {
    @IsString()
    @Length(2)
    name: string;

    @IsInt()
    availability: number;

    @IsString()
    @Length(2)
    description: string;

    @IsNumber()
    price: number;
}