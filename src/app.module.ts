import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // Apollo server 생성자에 전달됨
      // debug: false,
      // playground: false,
      // include된 모듈에서만 찾는다. 설정 안하면 imports한 모듈 전체 에서 찾음
      // include: [RecipesModule],
      autoSchemaFile: 'schema.gql', // Code first 방식
    }),
    RecipesModule,
    AuthorsModule,
    PostsModule,
  ],
})
export class AppModule {}
