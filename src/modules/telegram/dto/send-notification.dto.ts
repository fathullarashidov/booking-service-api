import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SendNotificationDto {
	@ApiProperty({
		example: 'Новая бронь! Иван, 2 гостя, 2023-12-31',
		description: 'Текст уведомления'
	})
	@IsString()
	@MinLength(5)
	@MaxLength(2000)
	message: string;
}
