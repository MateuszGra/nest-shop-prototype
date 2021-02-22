import { IsEnum, IsInt, IsOptional, IsString, Length, Min } from "class-validator";
import { ProductFilters, ProductOrder } from "../../interfaces/products";

export class GetFiltersDTO {
    @IsInt()
    @Min(1)
    page: number;

    @IsString()
    @IsOptional()
    @Length(2, 100)
    category: string;

    @IsString()
    @IsOptional()
    @IsEnum(ProductFilters)
    filter: string;

    @IsString()
    @IsOptional()
    @IsEnum(ProductOrder)
    order: string;
}