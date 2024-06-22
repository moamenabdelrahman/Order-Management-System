import { IsString, IsNotEmpty, IsEmail, IsStrongPassword, IsOptional, IsPhoneNumber } from "class-validator";

export class newUserDto
{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsPhoneNumber("EG")
    phone: string;
}