import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterUserDto{

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string; 
    
}