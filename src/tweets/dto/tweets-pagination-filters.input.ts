import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TweetCategoryEnum } from '../enums/tweet-category.enum';

@InputType()
export class TweetsPaginationFiltersInput {
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  authorId: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  parentTweetId: number;

  @IsEnum(TweetCategoryEnum)
  @IsOptional()
  @Field(() => TweetCategoryEnum, { nullable: true })
  category: TweetCategoryEnum;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  location: string;
}
