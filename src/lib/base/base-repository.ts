import { Transaction } from 'sequelize';
import { BaseModel } from './base-model';

export interface RepositoryPaginationOptionsType {
  page?: number;
  perPage?: number;
}

export interface RepositoryOptionsType {
  transaction?: Transaction;
}

export abstract class BaseRepository<M extends BaseModel> {
  public abstract paginate(
    paginationOptions: RepositoryPaginationOptionsType,
    filters?: Partial<M>,
    options?: RepositoryOptionsType,
  ): Promise<{
    rows: M[];
    currentPage: number;
    perPage: number;
    total: number;
  }>;
  public abstract findAll(filters?: Partial<M>, options?: RepositoryOptionsType): Promise<M[]>;
  public abstract findOne(filters?: Partial<M>, options?: RepositoryOptionsType): Promise<M>;
  public abstract findOneOrFail(filters?: Partial<M>, options?: RepositoryOptionsType): Promise<M>;
  public abstract findByPk(id: number, options?: RepositoryOptionsType): Promise<M>;
  public abstract findByPkOrFail(id: number, options?: RepositoryOptionsType): Promise<M>;
  public abstract create(data: Partial<M>, options?: RepositoryOptionsType): Promise<M>;
  public abstract update(id: number, data: Partial<M>, options?: RepositoryOptionsType): Promise<M>;
  public abstract delete(id: number, options?: RepositoryOptionsType): Promise<M>;
}
