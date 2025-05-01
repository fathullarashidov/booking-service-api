import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateWorkWithUsDto {
	@ApiProperty({ example: 'Иван', description: 'Имя кандидата' })
	@IsString()
	@IsNotEmpty()
	first_name: string;

	@ApiProperty({ example: '+79001234567', description: 'Номер телефона' })
	@IsPhoneNumber('RU')
	@IsNotEmpty()
	phone_number: string;

	@ApiProperty({ example: 'user@example.com', description: 'Email кандидата' })
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		example: 'Я хочу работать у вас...',
		description: 'Сопроводительное письмо'
	})
	@IsString()
	@IsNotEmpty()
	cover_letter: string;

	@ApiProperty({
		type: 'string',
		format: 'binary',
		description: 'Резюме (PDF, DOCX)'
	})
	resume: any; // Важно: тип 'any' для корректного отображения в Swagger
}
