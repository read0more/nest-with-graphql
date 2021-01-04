import { Module } from '@nestjs/common';
import { HumanService } from './human.service';
import { HumanResolver } from './human.resolver';

@Module({
  providers: [HumanResolver, HumanService]
})
export class HumanModule {}
