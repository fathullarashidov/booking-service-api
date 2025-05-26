import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { WorkWithUsService } from './work-with-us.service';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { UpdateWorkWithUsDto } from './dto/update-work-with-us.dto';
import { WorkWithUs } from './entities/work-with-us.entity';

@ApiTags('Work With Us')
@Controller('work-with-us')
export class WorkWithUsController {
	constructor(private readonly workWithUsService: WorkWithUsService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('resume', {
			limits: { fileSize: 5 * 1024 * 1024 },
			fileFilter: (req, file, cb) => {
				if (!file.originalname.match(/\.(pdf|docx)$/)) {
					return cb(
						new BadRequestException('Only PDF/DOCX files allowed!'),
						false
					);
				}
				cb(null, true);
			}
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Work application form with resume',
		// type: CreateWorkWithUsDto, // ← Используйте DTO напрямую
		schema: {
			type: 'object',
			properties: {
				resume: {
					type: 'string',
					format: 'binary',
					description: 'Resume file (PDF/DOCX)'
				},
				first_name: { type: 'string' },
				phone_number: { type: 'string' },
				email: { type: 'string' },
				cover_letter: { type: 'string' }
			}
		}
	})
	async create(
		@UploadedFile() resume: Express.Multer.File, // Изменили имя переменной
		@Body() dto: CreateWorkWithUsDto
	): Promise<WorkWithUs> {
		return this.workWithUsService.saveFile(resume, dto); // Передаем правильное имя
	}

	@Get()
	@ApiOperation({ summary: 'Get all work applications' })
	@ApiResponse({ status: 200, type: [WorkWithUs] })
	async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
		return this.workWithUsService.findAll(page, limit);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get work application by ID' })
	@ApiParam({ name: 'id', type: String })
	async findById(@Param('id') id: string): Promise<WorkWithUs> {
		return this.workWithUsService.findById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update work application metadata' })
	async update(
		@Param('id') id: string,
		@Body() dto: UpdateWorkWithUsDto
	): Promise<WorkWithUs> {
		return this.workWithUsService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete work application' })
	async delete(@Param('id') id: string): Promise<void> {
		return this.workWithUsService.delete(id);
	}

	@Get('stats/resumes')
	@ApiOperation({ summary: 'Get resumes statistics' })
	async getStats() {
		return this.workWithUsService.getResumeStats();
	}
}
