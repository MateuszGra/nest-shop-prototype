import {IsInt, IsNumber, IsOptional, IsString, Length, Max, Min} from "class-validator";

export class EditProductsDTO {
    @IsString()
    @IsOptional()
    @Length(2, 300)
    name: string;

    @IsString()
    @IsOptional()
    @Length(2, 100)
    category: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(999999)
    availability: number;

    @IsString()
    @IsOptional()
    @Length(2)
    description: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsOptional()
    @Min(0.01)
    @Max(9999999.99)
    price: number;

    @IsInt()
    @IsOptional()
    @Min(0)
    @Max(100)
    promotion: number;
}