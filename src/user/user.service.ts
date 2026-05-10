import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    @Get()
    fetchUser(email:string){
        return this.userModel.findOne({email});
    }

    @Post()
    async create(user:RegisterUserDto){
       return await this.userModel.create(user);
    }
}
