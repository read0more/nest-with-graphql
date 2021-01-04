import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HumanService } from './human.service';
import { Human } from './entities/human.entity';
import { CreateHumanInput } from './dto/create-human.input';
import { UpdateHumanInput } from './dto/update-human.input';

@Resolver(() => Human)
export class HumanResolver {
  constructor(private readonly humanService: HumanService) {}

  @Mutation(() => Human)
  createHuman(@Args('createHumanInput') createHumanInput: CreateHumanInput) {
    return this.humanService.create(createHumanInput);
  }

  @Query(() => [Human], { name: 'human' })
  findAll() {
    return this.humanService.findAll();
  }

  @Query(() => Human, { name: 'human' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.humanService.findOne(id);
  }

  @Mutation(() => Human)
  updateHuman(@Args('updateHumanInput') updateHumanInput: UpdateHumanInput) {
    return this.humanService.update(updateHumanInput.id, updateHumanInput);
  }

  @Mutation(() => Human)
  removeHuman(@Args('id', { type: () => Int }) id: number) {
    return this.humanService.remove(id);
  }
}
