import { registerEnumType } from '@nestjs/graphql';

export enum TweetCategoryEnum {
  Sport = 'Sport',
  Finance = 'Finance',
  Tech = 'Tech',
  News = 'News',
}

registerEnumType(TweetCategoryEnum, {
  name: 'TweetCategoryEnum',
});
