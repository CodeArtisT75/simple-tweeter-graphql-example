import { NotFoundException } from '@nestjs/common';
import { Attributes, FindAndCountOptions, FindOptions, Identifier, ModelStatic } from 'sequelize';
import { Model } from 'sequelize-typescript';

export abstract class BaseModel<TModelAttributes = any, TCreationAttributes = TModelAttributes> extends Model<
  TModelAttributes,
  TCreationAttributes
> {
  public static async findOneOrFail<M extends Model>(this: ModelStatic<M>, options: FindOptions): Promise<M> {
    const model = await this.findOne(options);

    if (!model) {
      throw new NotFoundException(`${this.name} not found`);
    }

    return model;
  }

  public static async findByPkOrFail<M extends Model>(
    this: ModelStatic<M>,
    identifier?: Identifier,
    options?: Omit<FindOptions<Attributes<M>>, 'where'>,
  ): Promise<M> {
    const model = await this.findByPk(identifier, options);

    if (!model) {
      throw new NotFoundException(`${this.name} not found`);
    }

    return model;
  }

  public static async paginate<M extends Model>(
    this: ModelStatic<M>,
    options?: Omit<FindAndCountOptions<Attributes<M>>, 'limit' | 'offset'> & {
      page: number;
      perPage: number;
    },
  ): Promise<{ rows: M[]; currentPage: number; perPage: number; total: number }> {
    const page = options.page ?? 1;
    const perPage = options.perPage ?? 10;

    const { rows, count } = await this.findAndCountAll({
      ...options,
      offset: (page - 1) * perPage,
      limit: perPage,
    });

    return {
      rows,
      total: count,
      currentPage: page,
      perPage,
    };
  }
}
