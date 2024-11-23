import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { BaseModel } from '../../lib/base/base-model';
import { User } from '../../users/entities/user.entity';
import { TweetCategoryEnum } from '../enums/tweet-category.enum';

@ObjectType()
@Table({ tableName: 'tweets' })
export class Tweet extends BaseModel {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id!: number;

  @Field(() => Number)
  @AllowNull(false)
  @Column({ onDelete: 'CASCADE' })
  authorId!: number;

  @Field(() => User, { nullable: true })
  @BelongsTo(() => User, 'authorId')
  author: User;

  @Field()
  @Column(DataType.TEXT)
  content: string;

  @Field(() => [String])
  @Default([])
  @Column(DataType.JSON)
  hashtags: string[];

  @Field(() => Int, { nullable: true })
  @AllowNull(true)
  @Column({ onDelete: 'CASCADE' })
  parentTweetId: number;

  @Field(() => Tweet, { nullable: true })
  @BelongsTo(() => Tweet, 'parentTweetId')
  parentTweet: Tweet;

  @Field({ nullable: true })
  @Column(DataType.STRING)
  category: TweetCategoryEnum;

  @Field({ nullable: true })
  @Column
  location: string;

  @Field(() => GraphQLISODateTime)
  @CreatedAt
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdatedAt
  updatedAt: Date;
}
