import { UpperCaseDirective } from './upper-case.directive';
import { PubSub } from 'apollo-server-express';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // Apollo server 생성자에 전달됨
      // debug: false,
      // playground: false,
      // include된 모듈에서만 찾는다. 설정 안하면 imports한 모듈 전체 에서 찾음
      // include: [RecipesModule],
      autoSchemaFile: 'schema.gql', // Code first 방식
      installSubscriptionHandlers: true,
      schemaDirectives: {
        upper: UpperCaseDirective,
      },

      // port 변경
      // subscriptions: {
      //   keepAlive: 5000,
      // }
    }),
    RecipesModule,
    AuthorsModule,
    PostsModule,
    CommentModule,
  ],
})
@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class AppModule {}
