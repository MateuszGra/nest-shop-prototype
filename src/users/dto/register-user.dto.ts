import { IsEmail, IsString, Length } from "class-validator";

export class RegisterUserDTO {
    @IsString()
    @Length(2, 100)
    name: string;

    @IsString()
    @Length(2, 100)
    surname: string;

    @IsEmail()
    @Length(4, 100)
    email: string;

    @IsString()
    @Length(6, 50)
    pwd: string
}