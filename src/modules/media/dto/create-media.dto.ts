import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMediaDto {
	@ApiProperty({
		required: false,
		example: 'Фото главного зала',
		description: 'Описание медиа-файла для поиска и фильтрации',
		maxLength: 255
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		required: false,
		example: 'interior',
		description: 'Категория для группировки медиа-файлов',
		enum: ['interior', 'menu', 'events', 'avatars', 'other'],
		default: 'other'
	})
	@IsOptional()
	@IsString()
	category?: string;
}
