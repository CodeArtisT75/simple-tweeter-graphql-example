import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],

  providers: [UsersRepository, UsersService],

  exports: [UsersService],
})
export class UsersModule {}
