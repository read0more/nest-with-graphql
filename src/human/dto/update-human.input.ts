import { CreateHumanInput } from './create-human.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHumanInput extends PartialType(CreateHumanInput) {
  @Field(() => Int)
  id: number;
}
