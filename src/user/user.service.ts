import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Injectable, Post } from '@nestjs/common';

@Injectable()
export class UserService {

    @Post()
    create(user:RegisterUserDto){
        console.log(user)
    }
}
