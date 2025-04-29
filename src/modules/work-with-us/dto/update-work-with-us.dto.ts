import { PartialType } from '@nestjs/swagger';
import { CreateWorkWithUsDto } from './create-work-with-us.dto';

export class UpdateWorkWithUsDto extends PartialType(CreateWorkWithUsDto) {}
