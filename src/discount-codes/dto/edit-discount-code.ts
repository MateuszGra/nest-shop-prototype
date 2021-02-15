import { IsBoolean, IsDate, IsInt, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class EditDiscountCodeDTO {
    @IsString()
    @IsOptional()
    @Length(2, 100)
    code: string;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    promotion: number;

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;

    @IsBoolean()
    @IsOptional()
    oneTime: boolean

    @IsBoolean()
    @IsOptional()
    available: boolean;
}