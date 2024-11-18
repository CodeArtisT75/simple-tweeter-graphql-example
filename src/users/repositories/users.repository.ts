import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, RepositoryOptionsType, RepositoryPaginationOptionsType } from 'src/lib/base/base-repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) protected readonly userModel: typeof User) {
    super();
  }

  public paginate(
    paginationOptions: RepositoryPaginationOptionsType,
    filters?: Partial<User>,
    options?: RepositoryOptionsType,
  ) {
    return this.userModel.paginate({
      page: paginationOptions.page,
      perPage: paginationOptions.perPage,
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findAll(filters?: Partial<User>, options?: RepositoryOptionsType) {
    return this.userModel.findAll({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findOne(filters?: Partial<User>, options?: RepositoryOptionsType) {
    return this.userModel.findOne({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findOneOrFail(filters?: Partial<User>, options?: RepositoryOptionsType) {
    return this.userModel.findOneOrFail({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findByPk(id: number, options?: RepositoryOptionsType) {
    return this.userModel.findByPk(id, {
      transaction: options?.transaction,
    });
  }

  public findByPkOrFail(id: number, options?: RepositoryOptionsType) {
    return this.userModel.findByPkOrFail(id, {
      transaction: options?.transaction,
    });
  }

  public create(data: Partial<User>, options?: RepositoryOptionsType) {
    return this.userModel.create(data, {
      transaction: options?.transaction,
    });
  }

  public async update(id: number, data: Partial<User>, options?: RepositoryOptionsType) {
    const user = await this.findByPkOrFail(id, options);

    return await user.update(data, { transaction: options?.transaction });
  }

  public async delete(id: number, options?: RepositoryOptionsType) {
    const user = await this.findByPkOrFail(id, options);

    await user.destroy({ transaction: options?.transaction });

    return user;
  }
}
