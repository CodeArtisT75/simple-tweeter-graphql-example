import { Field, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TweetCategoryEnum } from '../enums/tweet-category.enum';

@InputType()
export class CreateTweetInput {
  @IsString()
  @Field()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  hashtags: string[];

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
