import { InputType, Field, Directive } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Directive('@upper')
  @Field()
  content: string;
}
