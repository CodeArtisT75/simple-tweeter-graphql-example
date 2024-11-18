import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { genSalt, hash } from 'bcrypt';
import {
  AutoIncrement,
  BeforeSave,
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { BaseModel } from 'src/lib/base/base-model';

@ObjectType()
@Table({ tableName: 'users' })
export class User extends BaseModel {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Field(() => String)
  @Column
  fullName: string;

  @Field(() => GraphQLISODateTime)
  @CreatedAt
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdatedAt
  updatedAt: Date;

  @BeforeSave
  private static async hashPassword(user: User) {
    if (user.password && user.changed('password')) {
      const salt = await genSalt();
      user.password = await hash(user.password, salt);
    }

    if (user.email && user.changed('email')) {
      user.email = user.email.trim().toLowerCase();
    }
  }
}
