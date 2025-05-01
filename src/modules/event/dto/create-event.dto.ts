import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
	@ApiProperty({ example: 'wedding', description: 'Тип события' })
	@IsString()
	type: string;

	@ApiProperty({ example: 5000, description: 'Стоимость мероприятия' })
	@IsNumber()
	cost: number;

	@ApiProperty({ example: '2024-12-31', description: 'Дата проведения' })
	@IsString()
	date: string;

	@ApiProperty({ example: '19:00:00', description: 'Время начала' })
	@IsString()
	time: string;

	@ApiProperty({
		example: 'Роскошная свадьба',
		description: 'Главный заголовок'
	})
	@IsString()
	main_title: string;

	@ApiProperty({
		example: 'Описание мероприятия...',
		description: 'Основной текст'
	})
	@IsString()
	main_description: string;

	@ApiProperty({
		example: 'Свадьба Премиум',
		description: 'Заголовок карточки'
	})
	@IsString()
	card_title: string;

	@ApiProperty({
		example: ['Услуга 1', 'Услуга 2'],
		description: 'Список услуг/пунктов',
		type: [String]
	})
	@IsArray()
	@IsString({ each: true })
	paragraph: string[];

	@ApiProperty({
		example: 'Ваш идеальный день!',
		description: 'Мотивационный текст'
	})
	@IsString()
	motivation: string;

	@ApiProperty({
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5',
		description: 'ID связанного медиа-файла'
	})
	@IsUUID()
	mediaId: string;
}
