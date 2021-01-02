import { Comment } from './../comment/entities/comment.entity';
import { CreateCommentInput } from './../comment/dto/create-comment.input';
import { PubSub } from 'apollo-server-express';
import { CommentService } from './../comment/comment.service';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Inject } from '@nestjs/common';
@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @Mutation((returns) => Post)
  async addComment(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('comment', { type: () => CreateCommentInput })
    comment: CreateCommentInput,
  ): Promise<Post> {
    // const newComment = this.commentsService.create(comment);
    const newComment: Comment = {
      id: 123,
      content: '하드코딩',
    };
    this.pubSub.publish('commentAdded', { commentAdded: newComment });

    return {
      id: 123,
      title: '하드코딩',
    };
  }
}
