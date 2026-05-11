import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async fetchUser(email: string) {
    return await this.userModel.findOne({ email }).select('-password -__v');
  }

  async create(user: RegisterUserDto) {
    return await this.userModel.create(user);
  }
}
