import { Test, TestingModule } from '@nestjs/testing';
import { HumanResolver } from './human.resolver';
import { HumanService } from './human.service';

describe('HumanResolver', () => {
  let resolver: HumanResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HumanResolver, HumanService],
    }).compile();

    resolver = module.get<HumanResolver>(HumanResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
