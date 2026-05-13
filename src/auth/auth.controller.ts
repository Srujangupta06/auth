import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginUser, response);
  }

  @Post('sign-up')
  register(
    @Body() registerUser: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(registerUser, response);
  }

  @Post('sign-out')
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
