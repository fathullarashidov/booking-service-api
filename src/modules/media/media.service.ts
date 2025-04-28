import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { ensureDir, writeFile } from 'fs-extra';
import { CreateMediaDto } from '@/modules/media/dto/create-media.dto';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediaService {
	constructor(
		@InjectModel(MediaEntity)
		private mediaRepository: typeof MediaEntity
	) {}

	async saveFile(
		file: Express.Multer.File,
		dto: CreateMediaDto
	): Promise<MediaEntity> {
		try {
			const uploadDir = join(process.cwd(), 'media');
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
			throw new BadRequestException(`File upload failed: "${error}"`);
		}
	}

	async findAll(): Promise<MediaEntity[]> {
		return await this.mediaRepository.findAll();
	}

	async findById(id: string): Promise<MediaEntity> {
		const media = await this.mediaRepository.findByPk(id);
		if (!media) {
			throw new NotFoundException(`Media with ID ${id} not found`);
		}
		return media;
	}
}
