import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AuthGuard)
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async fetchUser(@Request() req) {
    const userEmail: string = req.user.sub;
    return await this.userService.fetchUserByEmail(userEmail);
  }

  @Patch('edit')
  updateUser(@Body() updateUserDto: UpdateUserDto,@Req() req) {
    return this.userService.updateUser(updateUserDto,req.user);
  }
}
