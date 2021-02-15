import { IsInt, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class NewProductDTO {
    @IsString()
    @Length(2, 300)
    name: string;

    @IsInt()
    @Min(1)
    @Max(999999)
    availability: number;

    @IsString()
    @Length(2)
    description: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    @Max(9999999.99)
    price: number;

    @IsInt()
    @Min(0)
    @Max(100)
    promotion: number;
}