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
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto) {
    // 2. Check if the user exists
    const exisitingUser = await this.userService.fetchUser(loginUser.email);
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
    const payload = {
      sub: loginUser.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    // 5. Return the token to the client
    return {
      data: {
        accessToken,
        message: 'User Logged in Successfully',
      },
    };
  }

  async register(registerUser: RegisterUserDto) {
    try {
      // 1. Check existing user
      const existingUser = await this.userService.fetchUser(registerUser.email);

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
      await this.userService.create(user);

      // 4. Generate token
      const payload = {
        sub: registerUser.email,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      // 5. Return response
      return {
        data: {
          accessToken,
        },
        message: 'User Registered Successfully',
      };
    } catch (err: any) {
      // Re-throw existing NestJS exceptions
      if (err instanceof HttpException) {
        throw err;
      }

      // Mongo duplicate key
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];

        throw new ConflictException(`${field} already exists!`);
      }

      console.error(err);

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  logout() {
    // 1. Invalidate the JWT token (if using a token blacklist)
    // 2. Clear the client-side token (if using cookies)
    return 'User Logged out Successfully';
  }
}
