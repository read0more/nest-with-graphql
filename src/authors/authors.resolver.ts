import { Comment } from './../comment/entities/comment.entity';
import { PubSub } from 'apollo-server-express';
import { PostsService } from './../posts/posts.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Inject } from '@nestjs/common';

// 여러 연결을 지원하지 않으므로 프로덕션에는 적합하지 않다고 한다. 실제로 쓰려면 아래 링크보고 참고 필요.
// https://github.com/apollographql/graphql-subscriptions#pubsub-implementations
// const pubSub = new PubSub();
@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll();
  }

  @Subscription((returns) => Comment, {
    resolve(this: AuthorsResolver, args) {
      console.log('args', args);
    },
    filter() {
      return true;
    },
  })
  commentAdded() {
    console.log('추가됨.');
    return this.pubSub.asyncIterator('commentAdded');
  }
}
