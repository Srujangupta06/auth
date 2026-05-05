import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({
    path:'auth',
    version:'1'
})
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('sign-in')
    login(){
        return this.authService.login();
    }

    @Post('sign-up')
    register(){
        return this.authService.register();
    }

    @Post('sign-out')
    logout(){
        return this.authService.logout();
    }
}
