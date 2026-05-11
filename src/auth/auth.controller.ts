import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller({
    path:'auth',
    version:'1'
})
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('sign-in')
    login(@Body() loginUser:LoginUserDto){
        return this.authService.login(loginUser);
    }

    @Post('sign-up')
    register(@Body() registerUser:RegisterUserDto){
        return this.authService.register(registerUser);
    }

    @Post('sign-out')
    logout(){
        return this.authService.logout();
    }
}
