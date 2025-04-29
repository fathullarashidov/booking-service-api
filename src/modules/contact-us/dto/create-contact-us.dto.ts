import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateContactUsDto {
	@ApiProperty({ example: 'Alex', description: 'First name' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'alex@mail.com', description: 'Email address' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '+998 99 999 99 99', description: 'Phone number' })
	@IsString()
	phone_number: string;

	@ApiProperty({
		description: 'What are you getting in touch about?'
	})
	@IsString()
	getting_touch: string;

	@ApiProperty({ example: 'Some message', description: 'Your message' })
	@IsString()
	your_message: string;
}
