import { Resolver, Query } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver({ isAbstract: true }) // isAbstract를 사용하면 이 클래스에서 SDL이 생성되지 않음
  abstract class BaseResolverHost {
    @Query((type) => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return [];
    }
  }
  return BaseResolverHost;
}

export default BaseResolver;
