import { userRole } from '@/user/enum/user.enum';

export interface tokenPayload {
  sub: string;
  role: userRole;
}
