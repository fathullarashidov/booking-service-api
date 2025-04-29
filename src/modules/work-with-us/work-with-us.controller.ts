import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkWithUsService } from './work-with-us.service';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { UpdateWorkWithUsDto } from './dto/update-work-with-us.dto';

@Controller('work-with-us')
export class WorkWithUsController {
  constructor(private readonly workWithUsService: WorkWithUsService) {}

  @Post()
  create(@Body() createWorkWithUsDto: CreateWorkWithUsDto) {
    return this.workWithUsService.create(createWorkWithUsDto);
  }

  @Get()
  findAll() {
    return this.workWithUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workWithUsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkWithUsDto: UpdateWorkWithUsDto) {
    return this.workWithUsService.update(+id, updateWorkWithUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workWithUsService.remove(+id);
  }
}
