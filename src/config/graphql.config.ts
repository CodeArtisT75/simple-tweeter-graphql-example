import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { join } from 'path';

export const GraphqlConfig: GqlModuleAsyncOptions<ApolloDriverConfig> = {
  driver: ApolloDriver,

  useFactory: (): ApolloDriverConfig => {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    };
  },
};
