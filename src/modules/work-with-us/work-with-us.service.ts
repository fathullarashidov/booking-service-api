import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { WorkWithUs } from '@/modules/work-with-us/entities/work-with-us.entity';

@Injectable()
export class WorkWithUsService {
	constructor(
		@InjectModel(WorkWithUs)
		private workWithUsModel: typeof WorkWithUs
	) {}

	async create(createWorkWithUsDto: CreateWorkWithUsDto, resumePath: string) {
		return this.workWithUsModel.create({
			...createWorkWithUsDto,
			resume: resumePath
		});
	}

	async findAll() {
		return this.workWithUsModel.findAll();
	}
}
