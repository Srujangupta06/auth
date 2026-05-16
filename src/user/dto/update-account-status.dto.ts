import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateUserAccountStatusDto extends PickType(RegisterUserDto, [
  'accountStatus',
] as const) {}
