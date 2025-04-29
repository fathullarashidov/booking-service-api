import { Injectable } from '@nestjs/common';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { UpdateWorkWithUsDto } from './dto/update-work-with-us.dto';

@Injectable()
export class WorkWithUsService {
  create(createWorkWithUsDto: CreateWorkWithUsDto) {
    return 'This action adds a new workWithUs';
  }

  findAll() {
    return `This action returns all workWithUs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workWithUs`;
  }

  update(id: number, updateWorkWithUsDto: UpdateWorkWithUsDto) {
    return `This action updates a #${id} workWithUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} workWithUs`;
  }
}
