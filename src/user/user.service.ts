import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Get, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async fetchUserByEmail(
    email: string,
    options?: {
      includePassword?: boolean;
    },
  ) {
    const query = this.userModel.findOne({ email });
    if (options?.includePassword) {
      return query.select('+password');
    }
    return query.select('-__v');
  }

  async create(user: RegisterUserDto) {
    return await this.userModel.create(user);
  }
}
