import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkWithUsService } from './work-with-us.service';
import { WorkWithUsController } from './work-with-us.controller';
import { WorkWithUs } from '@/modules/work-with-us/entities/work-with-us.entity';

@Module({
	imports: [SequelizeModule.forFeature([WorkWithUs])],
	providers: [WorkWithUsService],
	controllers: [WorkWithUsController]
})
export class WorkWithUsModule {}
