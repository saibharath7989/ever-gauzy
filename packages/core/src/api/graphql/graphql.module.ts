import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule, GraphQLTypesLoader } from '@nestjs/graphql';
import { GraphQLApiOptions } from '@gauzy/common';
import { ConfigService } from '../../config';
import { createGraphqlModuleOptions } from './graphql-helper';
import { SharedModule } from '../shared.module';

@Module({})
export class GraphqlModule {
  static registerAsync(options: (configService: ConfigService) => GraphQLApiOptions): DynamicModule {
    return GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService, typesLoader: GraphQLTypesLoader) => {
        return createGraphqlModuleOptions(configService, typesLoader, options(configService));
      },
      inject: [ConfigService, GraphQLTypesLoader],
      imports: [SharedModule],
    }) as DynamicModule;
  }
}
