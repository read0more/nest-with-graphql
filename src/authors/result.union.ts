import { Comment } from './../comment/entities/comment.entity';
import { Author } from './entities/author.entity';
import { createUnionType } from '@nestjs/graphql';
export const ResultUnion = createUnionType({
  name: 'Result',
  types: () => [Author, Comment],
});
