import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsString } from 'class-validator';

const STATUSES = [
	'in process',
	'declined',
	'cancelled',
	'confirmed',
	'pending',
	'completed',
	'archived'
];

export class CreateKidsInquireDto {
	@ApiProperty({ example: 'John', description: 'Client first name' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'john.doe@example.com', description: 'Client email' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '+1234567890', description: 'Client phone number' })
	@IsString()
	phone_number: string;

	@ApiProperty({ example: '2024-12-31', description: 'Event date' })
	@IsString()
	date: string;

	@ApiProperty({ example: 50, description: 'Number of attendees' })
	@IsInt()
	people_quantity: number;

	@ApiProperty({
		enum: STATUSES,
		default: 'pending',
		description: 'Request status'
	})
	@IsIn(STATUSES)
	status: string;

	@ApiProperty({
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5',
		description: 'ID of available masterclass'
	})
	@IsString()
	masterclassId: string;

	@ApiProperty({
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5',
		description: 'ID of available show for kids'
	})
	@IsString()
	showForKids: string;
}
