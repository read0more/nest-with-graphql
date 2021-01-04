import { Injectable } from '@nestjs/common';
import { CreateHumanInput } from './dto/create-human.input';
import { UpdateHumanInput } from './dto/update-human.input';

@Injectable()
export class HumanService {
  create(createHumanInput: CreateHumanInput) {
    return 'This action adds a new human';
  }

  findAll() {
    return `This action returns all human`;
  }

  findOne(id: number) {
    return `This action returns a #${id} human`;
  }

  update(id: number, updateHumanInput: UpdateHumanInput) {
    return `This action updates a #${id} human`;
  }

  remove(id: number) {
    return `This action removes a #${id} human`;
  }
}
