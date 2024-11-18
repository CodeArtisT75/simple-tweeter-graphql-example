import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],

  inject: [ConfigService],

  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('jwt.secret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.expiresIn'),
    },
  }),
};
