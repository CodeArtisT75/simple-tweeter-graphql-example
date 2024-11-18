import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtConfig } from '../config/jwt.config';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [JwtModule.registerAsync(JwtConfig), UsersModule],

  providers: [AuthResolver, AuthService, JwtStrategy],
})
export class AuthModule {}
