import {
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
	ApiNotFoundResponse,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger';
import { MediaService } from '@/modules/media/media.service';
import { CreateMediaDto } from '@/modules/media/dto/create-media.dto';
import { MediaEntity } from '@/modules/media/entities/media.entity';
import { UpdateMediaDto } from '@/modules/media/dto/update-media.dto';

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
	async findAll(
		@Query('page') page = 1,
		@Query('limit') limit = 10,
		@Query('type') mimeType?: string
	) {
		return this.mediaService.findAll(page, limit, mimeType);
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
	async findById(@Param('id') id: string): Promise<MediaEntity> {
		return this.mediaService.findById(id);
	}

	@Patch(':id')
	@ApiOperation({
		summary: 'Обновить метаданные медиа-файла',
		description: 'Обновляет информацию о файле (название, категорию и т.д.)'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'UUID идентификатор файла'
	})
	@ApiResponse({
		status: 200,
		type: MediaEntity,
		description: 'Обновленные данные файла'
	})
	async update(
		@Param('id') id: string,
		@Body() dto: UpdateMediaDto
	): Promise<MediaEntity> {
		return this.mediaService.update(id, dto);
	}

	@Patch(':id/file')
	@ApiOperation({
		summary: 'Заменить файл',
		description: 'Обновляет файл, сохраняя существующие метаданные'
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Новый файл для загрузки',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
					description: 'Новый файл для замены'
				}
			}
		}
	})
	@UseInterceptors(FileInterceptor('file'))
	async updateFile(
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File
	): Promise<MediaEntity> {
		return this.mediaService.updateFile(id, file);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Удалить медиа-файл',
		description: 'Полностью удаляет файл и связанные с ним метаданные'
	})
	@ApiResponse({
		status: 204,
		description: 'Файл успешно удален'
	})
	@ApiResponse({
		status: 404,
		description: 'Файл не найден'
	})
	async delete(@Param('id') id: string): Promise<void> {
		return this.mediaService.delete(id);
	}

	@Get('stats/usage')
	@ApiOperation({
		summary: 'Статистика использования медиа',
		description: 'Возвращает аналитику по типам и объему файлов'
	})
	@ApiResponse({
		status: 200,
		schema: {
			example: {
				total: 15,
				byType: { image: 10, video: 5 },
				totalSize: 10485760
			}
		}
	})
	async getStats() {
		return this.mediaService.getMediaStats();
	}
}
