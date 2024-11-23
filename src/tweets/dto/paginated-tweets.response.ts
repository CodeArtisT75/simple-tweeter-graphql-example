import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Tweet } from '../entities/tweet.entity';

@ObjectType()
export class PaginatedTweetsResponse {
  @Field(() => [Tweet])
  nodes: Tweet[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasNextPage: boolean;
}
