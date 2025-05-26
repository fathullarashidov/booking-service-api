import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { ensureDir, pathExists, remove, writeFile } from 'fs-extra';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { UpdateWorkWithUsDto } from './dto/update-work-with-us.dto';
import { WorkWithUs } from './entities/work-with-us.entity';
import * as process from 'process';

@Injectable()
export class WorkWithUsService {
	private readonly logger = new Logger(WorkWithUsService.name);

	constructor(
		@InjectModel(WorkWithUs)
		private workWithUsModel: typeof WorkWithUs
	) {}

	async saveFile(
		resume: Express.Multer.File,
		dto: CreateWorkWithUsDto
	): Promise<WorkWithUs> {
		try {
			const mediaLocation = process.env.MEDIA_LOCATION || 'media';
			const uploadDir = join(
				process.cwd(),
				process.env.MODE === 'production'
					? `${mediaLocation}/resumes`
					: 'media/resumes'
			);
			await ensureDir(uploadDir);

			const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
			const ext = resume.originalname.split('.').pop();
			const fileName = `${uniqueName}.${ext}`;
			const filePath = join(uploadDir, fileName);

			await writeFile(filePath, resume.buffer);

			return this.workWithUsModel.create({
				originalName: resume.originalname,
				fileName,
				path: `/media/resumes/${fileName}`,
				size: resume.size,
				mimeType: resume.mimetype,
				...dto
			});
		} catch (error) {
			this.logger.error(`Resume upload failed: ${error.message}`, error.stack);
			throw new BadRequestException('Resume upload failed');
		}
	}

	async findAll(page = 1, limit = 10) {
		const result = await this.workWithUsModel.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [['createdAt', 'DESC']]
		});

		return {
			data: result.rows,
			total: result.count
		};
	}

	async findById(id: string): Promise<WorkWithUs> {
		const application = await this.workWithUsModel.findByPk(id);
		if (!application) {
			throw new NotFoundException(`Application with ID ${id} not found`);
		}
		return application;
	}

	async update(id: string, dto: UpdateWorkWithUsDto): Promise<WorkWithUs> {
		const application = await this.findById(id);
		return application.update(dto);
	}

	async delete(id: string): Promise<void> {
		const application = await this.findById(id);
		const mediaLocation = process.env.MEDIA_LOCATION || 'media';
		const basePath =
			process.env.MODE === 'production'
				? `${mediaLocation}/resumes`
				: 'media/resumes';
		const filePath = join(process.cwd(), basePath, application.fileName);

		try {
			if (await pathExists(filePath)) {
				await remove(filePath);
			}
			await application.destroy();
		} catch (error) {
			this.logger.error(
				`Resume deletion failed: ${error.message}`,
				error.stack
			);
			throw new BadRequestException('Resume deletion failed');
		}
	}

	async getResumeStats() {
		const applications = await this.workWithUsModel.findAll();

		return {
			total: applications.length,
			byType: applications.reduce((acc, app) => {
				const type = app.mimeType.split('/')[1];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			}, {}),
			totalSize: applications.reduce((sum, app) => sum + app.size, 0)
		};
	}
}
