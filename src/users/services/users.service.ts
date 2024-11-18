import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  public async findUserById(id: number): Promise<User> {
    return this.usersRepository.findByPkOrFail(id);
  }

  findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  findUserByEmailOrFail(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ email });
  }

  async createUser({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<User> {
    return this.usersRepository.create({ email, password, fullName });
  }
}
