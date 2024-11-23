import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { CreateTweetInput } from '../dto/create-tweet.input';
import { TweetsPaginationFiltersInput } from '../dto/tweets-pagination-filters.input';
import { UpdateTweetInput } from '../dto/update-tweet.input';
import { Tweet } from '../entities/tweet.entity';
import { TweetsRepository } from '../repositories/tweets.repository';

@Injectable()
export class TweetsService {
  constructor(protected tweetsRepository: TweetsRepository) {}

  create(createTweetInput: CreateTweetInput, user: User) {
    return this.tweetsRepository.create({
      authorId: user.id,
      ...createTweetInput,
    });
  }

  async paginateTweets(
    {
      page,
      limit,
    }: {
      page: number;
      limit: number;
    },
    tweetsPaginationFiltersInput?: TweetsPaginationFiltersInput,
  ) {
    const filters: Partial<Tweet> = {};

    if (tweetsPaginationFiltersInput?.authorId) {
      filters.authorId = tweetsPaginationFiltersInput.authorId;
    }

    if (tweetsPaginationFiltersInput?.parentTweetId) {
      filters.parentTweetId = tweetsPaginationFiltersInput.parentTweetId;
    }

    if (tweetsPaginationFiltersInput?.category) {
      filters.category = tweetsPaginationFiltersInput.category;
    }

    if (tweetsPaginationFiltersInput?.location) {
      filters.location = tweetsPaginationFiltersInput.location;
    }

    const { rows, hasNextPage, total } = await this.tweetsRepository.paginate(
      {
        page,
        perPage: limit,
      },
      filters,
      {
        include: ['author', 'parentTweet'],
        order: [['createdAt', 'DESC']],
      },
    );

    return {
      nodes: rows,
      totalCount: total,
      hasNextPage,
    };
  }

  findOne(id: number) {
    return this.tweetsRepository.findByPkOrFail(id);
  }

  async update(id: number, updateTweetInput: UpdateTweetInput, user: User) {
    const tweet = await this.findOne(id);

    if (user.id !== tweet.authorId) {
      throw new ForbiddenException('You are not allowed to delete this tweet');
    }

    await tweet.update(updateTweetInput);

    return tweet;
  }

  async remove(id: number, user: User) {
    const tweet = await this.findOne(id);

    if (user.id !== tweet.authorId) {
      throw new ForbiddenException('You are not allowed to delete this tweet');
    }

    await tweet.destroy();

    return tweet;
  }
}
