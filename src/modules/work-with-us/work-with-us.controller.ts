import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorkWithUsService } from './work-with-us.service';
import { CreateWorkWithUsDto } from './dto/create-work-with-us.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('work-with-us')
export class WorkWithUsController {
	constructor(private readonly workWithUsService: WorkWithUsService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('resume', {
			limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
			fileFilter: (req, file, cb) => {
				if (!file.originalname.match(/\.(pdf|docx)$/)) {
					return cb(new Error('Only PDF/DOCX files allowed!'), false);
				}
				cb(null, true);
			}
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Форма "Работа с нами"',
		type: CreateWorkWithUsDto // Указываем DTO
	})
	async create(
		@Body() createWorkWithUsDto: CreateWorkWithUsDto,
		@UploadedFile() resume: Express.Multer.File
	) {
		return this.workWithUsService.create(createWorkWithUsDto, resume?.path);
	}

	@Get()
	async findAll() {
		return this.workWithUsService.findAll();
	}
}
