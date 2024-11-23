import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { TweetsRepository } from './repositories/tweets.repository';
import { TweetsResolver } from './resolvers/tweets.resolver';
import { TweetsService } from './services/tweets.service';

@Module({
  imports: [SequelizeModule.forFeature([Tweet])],

  providers: [TweetsResolver, TweetsService, TweetsRepository],
})
export class TweetsModule {}
