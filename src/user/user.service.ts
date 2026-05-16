import { RegisterUserDto } from '@/auth/dto/registerUser.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { tokenPayload } from '@/shared/interface/interface';
import { UpdateUserAccountStatusDto } from './dto/update-account-status.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly userRepository: UserRepository,
  ) {}

  async fetchUserByEmail(
    email: string,
    options?: {
      includePassword?: boolean;
    },
  ) {
    const existingUser = await this.userRepository.fetchUserByEmail(
      email,
      options?.includePassword,
    );
    if (!existingUser) {
      throw new NotFoundException('User Not Found');
    }
    return existingUser;
  }

  async fetchUserById(
    user: tokenPayload,
    options?: {
      includePassword?: boolean;
    },
  ) {
    const existingUser = await this.userRepository.fetchUserById(
      user.sub,
      options?.includePassword,
    );
    if (!existingUser) {
      throw new NotFoundException('User Not Found');
    }
    return existingUser;
  }

  async createUser(user: RegisterUserDto) {
    return await this.userRepository.createUser(user);
  }

  async updateUser(updateUserDto: UpdateUserDto, user: tokenPayload) {
    const updatedUser = await this.userRepository.updateUserById(
      user.sub,
      updateUserDto,
    );
    return {
      message: 'User Updated Successfully',
      data: updatedUser,
    };
  }

  async updateUserAccountStatus(
    updateUserAccountStatus: UpdateUserAccountStatusDto,
    user: tokenPayload,
  ) {
    const updatedUser = await this.userRepository.updateUserAccountStatus(
      updateUserAccountStatus.accountStatus,
      user.sub,
    );
    return {
      message: 'User Account Status Updated Successully',
      data: updatedUser,
    };
  }
}
