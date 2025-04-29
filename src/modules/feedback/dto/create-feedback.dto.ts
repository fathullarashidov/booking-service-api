import {
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	Max,
	Min
} from 'class-validator';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
	@ApiProperty({
		example: 'Иван',
		description: 'Имя клиента',
		required: true,
		maxLength: 50,
		minLength: 2,
		type: String
	})
	@IsString({ message: 'Имя должно быть строкой' })
	first_name: string;

	@ApiProperty({
		example: 'ivan@example.com',
		description: 'Действующий email клиента',
		format: 'email',
		required: true,
		pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
	})
	@IsEmail({}, { message: 'Неверный формат email' })
	email: string;

	@ApiProperty({
		example: 9,
		description: 'Оценка качества обслуживания',
		minimum: 1,
		maximum: 10,
		type: Number,
		required: true,
		enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	})
	@IsInt({ message: 'Оценка должна быть целым числом' })
	@Min(1, { message: 'Минимальная оценка - 1' })
	@Max(10, { message: 'Максимальная оценка - 10' })
	rate: number;

	@ApiProperty({
		example: 'Отличный сервис!',
		description: 'Дополнительные комментарии клиента',
		required: false,
		maxLength: 500,
		nullable: true,
		type: String
	})
	@IsOptional()
	@IsString({ message: 'Комментарий должен быть строкой' })
	additional_info?: string;
}

@ApiExtraModels(CreateFeedbackDto)
export class UpdateFeedbackDto extends CreateFeedbackDto {
	@ApiProperty({
		required: false,
		description: 'Имя клиента'
	})
	@IsOptional()
	@IsString()
	declare first_name: string;

	@ApiProperty({
		required: false,
		description: 'Email клиента'
	})
	@IsOptional()
	@IsEmail()
	declare email: string;

	@ApiProperty({
		required: false,
		description: 'Оценка качества обслуживания'
	})
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(10)
	declare rate: number;

	@ApiProperty({
		required: false,
		description: 'Дополнительные комментарии клиента'
	})
	@IsOptional()
	@IsString()
	declare additional_info?: string;
}
