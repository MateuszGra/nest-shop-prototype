import { IsEmail, IsString, Length } from "class-validator";

export class registerUserDTO {
    @IsString()
    @Length(2)
    name: string;

    @IsString()
    @Length(2)
    surname: string;

    @IsEmail()
    email: string;
}