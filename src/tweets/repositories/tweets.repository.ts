import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository, RepositoryOptionsType, RepositoryPaginationOptionsType } from 'src/lib/base/base-repository';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetsRepository extends BaseRepository<Tweet> {
  constructor(@InjectModel(Tweet) protected readonly tweetModel: typeof Tweet) {
    super();
  }

  public paginate(
    paginationOptions: RepositoryPaginationOptionsType,
    filters?: Partial<Tweet>,
    options?: RepositoryOptionsType,
  ) {
    return this.tweetModel.paginate({
      page: paginationOptions.page,
      perPage: paginationOptions.perPage,
      where: filters,
      transaction: options?.transaction,
      include: options.include,
      order: options.order,
    });
  }

  public findAll(filters?: Partial<Tweet>, options?: RepositoryOptionsType) {
    return this.tweetModel.findAll({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findOne(filters?: Partial<Tweet>, options?: RepositoryOptionsType) {
    return this.tweetModel.findOne({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findOneOrFail(filters?: Partial<Tweet>, options?: RepositoryOptionsType) {
    return this.tweetModel.findOneOrFail({
      where: filters,
      transaction: options?.transaction,
    });
  }

  public findByPk(id: number, options?: RepositoryOptionsType) {
    return this.tweetModel.findByPk(id, {
      transaction: options?.transaction,
    });
  }

  public findByPkOrFail(id: number, options?: RepositoryOptionsType) {
    return this.tweetModel.findByPkOrFail(id, {
      transaction: options?.transaction,
    });
  }

  public create(data: Partial<Tweet>, options?: RepositoryOptionsType) {
    return this.tweetModel.create(data, {
      transaction: options?.transaction,
    });
  }

  public async update(id: number, data: Partial<Tweet>, options?: RepositoryOptionsType) {
    const tweet = await this.findByPkOrFail(id, options);

    return await tweet.update(data, { transaction: options?.transaction });
  }

  public async delete(id: number, options?: RepositoryOptionsType) {
    const tweet = await this.findByPkOrFail(id, options);

    await tweet.destroy({ transaction: options?.transaction });

    return tweet;
  }
}
