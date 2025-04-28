import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { MediaService } from '@/modules/media/media.service';
import { CreateMediaDto } from '@/modules/media/dto/create-media.dto';
import { MediaEntity } from '@/modules/media/entities/media.entity';

@ApiTags('Media')
@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@Post('upload')
	@ApiOperation({
		summary: 'Загрузка медиа-файла',
		description: 'Загрузка изображений и других медиа-файлов на сервер'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Форма для загрузки файла',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
					description: 'Файл для загрузки (разрешены: jpg, png, gif)'
				},
				description: {
					type: 'string',
					example: 'Фото интерьера ресторана'
				},
				category: {
					type: 'string',
					example: 'events',
					enum: ['interior', 'menu', 'events', 'avatars']
				}
			}
		}
	})
	@ApiResponse({
		status: 201,
		type: MediaEntity,
		description: 'Файл успешно загружен'
	})
	@ApiResponse({
		status: 400,
		description: 'Некорректный формат файла или превышен размер'
	})
	@UseInterceptors(FileInterceptor('file'))
	async upload(
		@UploadedFile() file: Express.Multer.File,
		@Body() dto: CreateMediaDto
	): Promise<MediaEntity> {
		return this.mediaService.saveFile(file, dto);
	}

	@Get()
	@ApiOperation({
		summary: 'Получить все медиа-файлы',
		description: 'Возвращает список всех загруженных медиа-файлов'
	})
	@ApiResponse({
		status: 200,
		type: [MediaEntity],
		description: 'Список медиа-файлов'
	})
	findAll(): Promise<MediaEntity[]> {
		return this.mediaService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Получить медиа-файл по ID',
		description: 'Возвращает информацию о конкретном медиа-файле'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'UUID идентификатор файла',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiResponse({
		status: 200,
		type: MediaEntity,
		description: 'Информация о медиа-файле'
	})
	@ApiNotFoundResponse({
		description: 'Файл с указанным ID не найден'
	})
	@ApiResponse({
		status: 400,
		description: 'Некорректный формат UUID'
	})
	findById(@Param('id') id: string): Promise<MediaEntity> {
		return this.mediaService.findById(id);
	}
}
