import { userRole } from '@/user/enum/user.enum';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(userRole, {
    message: 'Invalid User',
  })
  role: userRole = userRole.USER;
}
