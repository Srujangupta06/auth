import { userAccountStatus, userRole } from '@/user/enum/user.enum';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain uppercase, lowercase, number, special character and minimum 8 characters',
    },
  )
  password: string;

  @IsEnum(userRole, {
    message: 'Invalid User',
  })
  role: userRole = userRole.USER;

  @IsEnum(userAccountStatus,{
    message:'Invalid Account Status'
  })
  accountStatus: userAccountStatus = userAccountStatus.ACTIVE
}
