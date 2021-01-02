import { CommentModule } from './../comment/comment.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [CommentModule],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
