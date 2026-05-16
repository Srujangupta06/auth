import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
import { userRole } from '@/user/enum/user.enum';
import { Logger } from '@nestjs/common';
import { tokenPayload } from '@/shared/interface/interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto, res: Response) {
    // 2. Check if the user exists

    const exisitingUser = await this.getExistingUserWithPassword(
      loginUser.email,
    );

    if (!exisitingUser) {
      throw new NotFoundException('Please Register First');
    }
    // 3. Verify the password
    const isPasswordMatched = await bcrypt.compare(
      loginUser.password,
      exisitingUser.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Incorrect Password');
    }
    // 4. Generate a JWT token
    const payload: tokenPayload = {
      sub: exisitingUser?._id.toString(),
      role: exisitingUser?.role,
    };
    const accessToken = await this.generateJwtToken(payload);
    res.cookie('accessToken', accessToken);
    // 5. Return the token to the client
    return {
      message: 'User Logged in Successfully',
      data: { accessToken },
    };
  }

  async register(registerUser: RegisterUserDto, res: Response) {
      // 1. Check existing user
      const existingUser = await this.getExistingUserWithPassword(
        registerUser.email,
      );

      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // 2. Hash password
      const hashedPassword = await bcrypt.hash(registerUser.password, 10);
      const user = {
        ...registerUser,
        password: hashedPassword,
      };

      // 3. Save user
      const createdUser = await this.userService.createUser(user);
      // 4. Generate token
      const payload: tokenPayload = {
        sub: createdUser?._id.toString(),
        role: createdUser?.role,
      };

      const accessToken = await this.generateJwtToken(payload);
      res.cookie('accessToken', accessToken);
      // 5. Return response
      return {
        message: 'User Registered Successfully',
        data: {
          accessToken,
        },
      };
  }

  logout(res: Response) {
    // 1. Invalidate the JWT token (if using a token blacklist)
    res.clearCookie('accessToken');
    // 2. Clear the client-side token (if using cookies)
    return 'User Logged out Successfully';
  }

  private async generateJwtToken(payload: tokenPayload) {
    return await this.jwtService.signAsync(payload);
  }

  private async getExistingUserWithPassword(email: string) {
    return await this.userService.fetchUserByEmail(email, {
      includePassword: true,
    });
  }
}
