import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateTweetInput } from './create-tweet.input';

@InputType()
export class UpdateTweetInput extends PartialType(CreateTweetInput) {
  @IsInt()
  @Field(() => Int)
  id: number;
}
