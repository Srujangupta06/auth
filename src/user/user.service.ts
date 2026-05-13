import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Injectable, NotFoundException, Post } from '@nestjs/common';
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
    const existingUser = this.userModel.findOne({ email });
    if (!existingUser) {
      throw new NotFoundException('User Not Found');
    }
    if (options?.includePassword) {
      return existingUser.select('+password');
    }
    return existingUser.select('-__v');
  }

  async create(user: RegisterUserDto) {
    return await this.userModel.create(user);
  }
}
