import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../lib/decorators/auth-user.decorator';
import { User } from '../../users/entities/user.entity';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { PaginatedTweetsResponse } from '../dto/paginated-tweets.response';
import { TweetsPaginationFiltersInput } from '../dto/tweets-pagination-filters.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { Tweet } from '../entities/tweet.entity';
import { TweetsService } from '../services/tweets.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Tweet)
export class TweetsResolver {
  constructor(private readonly tweetsService: TweetsService) {}

  @Mutation(() => Tweet, { name: 'createTweet' })
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput, @AuthUser() user: User): Promise<Tweet> {
    return this.tweetsService.create(createTweetInput, user);
  }

  @Query(() => PaginatedTweetsResponse, { name: 'paginateTweets' })
  paginateTweets(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }, ParseIntPipe) page: number,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }, ParseIntPipe) limit: number,
    @Args('tweetsPaginationFiltersInput', { nullable: true })
    tweetsPaginationFiltersInput: TweetsPaginationFiltersInput,
  ): Promise<PaginatedTweetsResponse> {
    return this.tweetsService.paginateTweets({ page, limit }, tweetsPaginationFiltersInput);
  }

  @Query(() => Tweet, { name: 'tweet' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Tweet> {
    return this.tweetsService.findOne(id);
  }

  @Mutation(() => Tweet, { name: 'updateTweet' })
  updateTweet(@Args('updateTweetInput') updateTweetInput: UpdateTweetInput, @AuthUser() user: User): Promise<Tweet> {
    return this.tweetsService.update(updateTweetInput.id, updateTweetInput, user);
  }

  @Mutation(() => Tweet, { name: 'removeTweet' })
  removeTweet(@Args('id', { type: () => Int }, ParseIntPipe) id: number, @AuthUser() user: User): Promise<Tweet> {
    return this.tweetsService.remove(id, user);
  }

  @ResolveField(() => User)
  author(@Parent() tweet: Tweet): User {
    return tweet.author;
  }

  @ResolveField(() => Tweet)
  parentTweet(@Parent() tweet: Tweet): Tweet {
    return tweet.parentTweet;
  }
}
