import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}

    login(){
        // 1. Validate the Body
        // 2. Check if the user exists
        // 3. Verify the password
        // 4. Generate a JWT token
        // 5. Return the token to the client
        return 'User Logged in Successfully';
    }

    async register(registerUser:RegisterUserDto){
        // 1. Validate the Body
        // 2. Check if the user already exists
        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(registerUser.password,10);
        const user = {...registerUser,password:hashedPassword};
        // 4. Save the user to the database
        const savedUser = this.userService.create(user);
        // 5. Generate a JWT token
        // 6. Return the token to the client
        return 'User Registered Successfully';
    }

    logout(){
        // 1. Invalidate the JWT token (if using a token blacklist)
        // 2. Clear the client-side token (if using cookies)
        return 'User Logged out Successfully';
    }
}
