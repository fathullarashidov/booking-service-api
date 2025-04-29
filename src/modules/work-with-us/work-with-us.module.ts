import { Module } from '@nestjs/common';
import { WorkWithUsService } from './work-with-us.service';
import { WorkWithUsController } from './work-with-us.controller';

@Module({
  controllers: [WorkWithUsController],
  providers: [WorkWithUsService],
})
export class WorkWithUsModule {}
