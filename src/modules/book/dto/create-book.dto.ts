import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
	@ApiProperty({ example: 'Alex', description: 'First name' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'alex@mail.com', description: 'Email address' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '+998 99 999 99 99', description: 'Phone number' })
	@IsString()
	phone_number: string;

	@ApiProperty({ example: 6, description: 'Number of people' })
	@IsString()
	people_quantity: number;

	@ApiProperty({
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5',
		description: 'ID of event'
	})
	@IsUUID()
	eventId: string;
}
