import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller({
    path:'auth',
    version:'1'
})
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @Post('sign-in')
    login(){
        return this.authService.login();
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
