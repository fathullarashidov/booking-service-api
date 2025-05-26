import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { ensureDir, pathExists, remove, writeFile } from 'fs-extra';
import { CreateMediaDto } from '@/modules/media/dto/create-media.dto';
import { UpdateMediaDto } from '@/modules/media/dto/update-media.dto';
import { MediaEntity } from './entities/media.entity';
import * as process from 'node:process';

@Injectable()
export class MediaService {
	private readonly logger = new Logger(MediaService.name);

	constructor(
		@InjectModel(MediaEntity)
		private mediaRepository: typeof MediaEntity
	) {}

	async saveFile(
		file: Express.Multer.File,
		dto: CreateMediaDto
	): Promise<MediaEntity> {
		try {
			const uploadDir = join(
				process.cwd(),
				process.env.MODE === 'production'
					? process.env.MEDIA_LOCATION!
					: 'media'
			);
			await ensureDir(uploadDir);

			const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
			const ext = file.originalname.split('.').pop();
			const fileName = `${uniqueName}.${ext}`;
			const filePath = join(uploadDir, fileName);

			await writeFile(filePath, file.buffer);

			return this.mediaRepository.create({
				originalName: file.originalname,
				fileName,
				path: `/media/${fileName}`,
				size: file.size,
				mimeType: file.mimetype,
				...dto
			});
		} catch (error) {
			this.logger.error(`File upload failed: ${error.message}`, error.stack);
			throw new BadRequestException('File upload failed');
		}
	}

	async findAll(
		page = 1,
		limit = 10,
		mimeType?: string
	): Promise<{ data: MediaEntity[]; total: number }> {
		const where = mimeType ? { mimeType } : {};
		const result = await this.mediaRepository.findAndCountAll({
			where,
			limit,
			offset: (page - 1) * limit,
			order: [['createdAt', 'DESC']]
		});

		return {
			data: result.rows,
			total: result.count
		};
	}

	async findById(id: string): Promise<MediaEntity> {
		const media = await this.mediaRepository.findByPk(id);
		if (!media) {
			throw new NotFoundException(`Media with ID ${id} not found`);
		}
		return media;
	}

	async update(id: string, dto: UpdateMediaDto): Promise<MediaEntity> {
		const media = await this.findById(id);
		return media.update(dto);
	}

	async updateFile(
		id: string,
		file: Express.Multer.File
	): Promise<MediaEntity> {
		const media = await this.findById(id);
		const oldFilePath = join(process.cwd(), 'media', media.fileName);

		try {
			// Удаляем старый файл
			if (await pathExists(oldFilePath)) {
				await remove(oldFilePath);
			}

			// Сохраняем новый файл
			const uploadDir = join(process.cwd(), 'media');
			const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
			const ext = file.originalname.split('.').pop();
			const fileName = `${uniqueName}.${ext}`;
			const filePath = join(uploadDir, fileName);

			await writeFile(filePath, file.buffer);

			// Обновляем запись
			return media.update({
				originalName: file.originalname,
				fileName,
				path: `/media/${fileName}`,
				size: file.size,
				mimeType: file.mimetype
			});
		} catch (error) {
			this.logger.error(`File update failed: ${error.message}`, error.stack);
			throw new BadRequestException('File update failed');
		}
	}

	async delete(id: string): Promise<void> {
		const media = await this.findById(id);
		const filePath = join(process.cwd(), 'media', media.fileName);

		try {
			if (await pathExists(filePath)) {
				await remove(filePath);
			}
			await media.destroy();
		} catch (error) {
			this.logger.error(`File deletion failed: ${error.message}`, error.stack);
			throw new BadRequestException('File deletion failed');
		}
	}

	async getMediaStats(): Promise<{
		total: number;
		byType: Record<string, number>;
		totalSize: number;
	}> {
		const allMedia = await this.mediaRepository.findAll();

		return {
			total: allMedia.length,
			byType: allMedia.reduce((acc, media) => {
				const type = media.mimeType.split('/')[0];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				acc[type] = (acc[type] || 0) + 1;
				return acc;
			}, {}),
			totalSize: allMedia.reduce((sum, media) => sum + media.size, 0)
		};
	}
}
