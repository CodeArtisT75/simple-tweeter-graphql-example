import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Configurations } from './config/configurations';
import { GraphqlConfig } from './config/graphql.config';
import { SequelizeConfig } from './config/sequelize.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Configurations],
    }),

    SequelizeModule.forRootAsync(SequelizeConfig),

    GraphQLModule.forRootAsync<ApolloDriverConfig>(GraphqlConfig),

    UsersModule,

    AuthModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
