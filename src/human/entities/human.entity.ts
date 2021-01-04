import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Character } from 'src/character.interface';

@ObjectType({
  implements: () => [Character],
})
export class Human implements Character {
  id: string;
  name: string;
}
