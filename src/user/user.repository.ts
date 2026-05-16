import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { userAccountStatus } from './enum/user.enum';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // FETCH USER BY ID
  async fetchUserById(userId: string, includePassword: boolean = false) {
    const user = this.userModel.findById(userId);
    if (includePassword) {
      user.select('+password');
    }
    return await user;
  }

  // FETCH USER BY EMAIL
  async fetchUserByEmail(email: string, includePassword: boolean = false) {
    const user = this.userModel.findOne({ email });
    if (includePassword) {
      user.select('+password');
    }
    return await user;
  }

  // FETCH ALL USERS ONLY FOR ADMIN

  // CREATE NEW USER
  async createUser(user: RegisterUserDto) {
    return await this.userModel.create(user);
  }

  // UPDATE EXISITING USER
  async updateUserById(userId: string, incomingData: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
        },
        incomingData,
        {
          new: true,
        },
      )
      .select('-__v');
    return updatedUser;
  }

  // UPDATE USER ACCOUNT STATUS [ACTIVE,IN-ACTIVE]
  async updateUserAccountStatus(accountStatus: userAccountStatus, userId: string) {
    const updatedUser = await this.userModel
      .findOneAndUpdate(
        {
          _id: userId,
        },
        { accountStatus },
        {
          new: true,
        },
      )
      .select('-__v');
    return updatedUser;
  }

  // DELETE USER
  async deleteUserById(userId: string) {
    await this.userModel.findByIdAndDelete(userId);
  }
}
