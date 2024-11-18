import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    protected jwtService: JwtService,
    protected usersService: UsersService,
  ) {}

  async register(registerDto: RegisterInput): Promise<{
    accessToken: string;
  }> {
    if (await this.usersService.findUserByEmail(registerDto.email)) {
      throw new BadRequestException('User with this email exists');
    }

    const user = await this.usersService.createUser(registerDto);

    const payload = {
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login({ email, password }: { email: string; password: string }): Promise<{ accessToken: string }> {
    const user = await this.usersService.findUserByEmailOrFail(email);

    if (!(await Bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
