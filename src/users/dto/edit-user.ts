import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class EditUserDTO {
    @IsString()
    @IsOptional()
    @Length(2, 100)
    name: string;

    @IsString()
    @IsOptional()
    @Length(2, 100)
    surname: string;

    @IsEmail()
    @IsOptional()
    @Length(4, 100)
    email: string;
}