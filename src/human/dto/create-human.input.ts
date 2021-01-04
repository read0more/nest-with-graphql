import { AllowedColor } from './../allowed-color.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHumanInput {
  @Field()
  name: string;

  @Field(() => AllowedColor)
  favoriteColor: string;
}
