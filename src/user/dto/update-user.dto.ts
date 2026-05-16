import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterUserDto, ['email','accountStatus'] as const),
) {}
