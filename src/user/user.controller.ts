import { Body, Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/auth/guard/auth.guard';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async fetchUser(@Request() req) {
    const userEmail:string = req.user.sub;
    return await this.userService.fetchUserByEmail(userEmail);
  }
}
