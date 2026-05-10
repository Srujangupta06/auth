import { UserService } from '@/user/user.service';
import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login() {
    // 1. Validate the Body
    // 2. Check if the user exists
    // 3. Verify the password
    // 4. Generate a JWT token
    // 5. Return the token to the client
    return 'User Logged in Successfully';
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

      const token = await this.jwtService.signAsync(payload);

      // 5. Return response
      return {
        data: {
          token,
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
