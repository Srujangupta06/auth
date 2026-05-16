import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { tokenPayload } from '@/shared/interface/interface';
import { CurrentUser } from '@/shared/decorator/current-user.decorator';
import { UpdateUserAccountStatusDto } from './dto/update-account-status.dto';

@UseGuards(AuthGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async fetchUser(@CurrentUser() user: tokenPayload) {
    return await this.userService.fetchUserById(user);
  }

  @Patch('edit')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: tokenPayload,
  ) {
    return this.userService.updateUser(updateUserDto, user);
  }

  @Patch('account-status')
  updateUserAccountStatus(
    @Body() updateUserAccountStatus: UpdateUserAccountStatusDto,
    @CurrentUser() user: tokenPayload,
  ) {
    return this.userService.updateUserAccountStatus(updateUserAccountStatus, user);
  }
}
