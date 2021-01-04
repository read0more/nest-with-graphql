import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(
  OmitType(CreateAuthorInput, ['exampleField'] as const),
) {
  @Field(() => Int)
  id: number;
}
