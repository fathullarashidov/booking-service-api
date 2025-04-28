import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsEmail,
	IsIn,
	IsInt,
	IsPhoneNumber,
	IsString
} from 'class-validator';

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
	@IsPhoneNumber()
	phone_number: string;

	@ApiProperty({ example: '2024-12-31', description: 'Event date' })
	@IsDateString()
	date: Date;

	@ApiProperty({ example: 50, description: 'Number of attendees' })
	@IsInt()
	people_quantity: number;

	@ApiProperty({ example: 'Painting', description: 'Masterclass type' })
	@IsString()
	declare masterclass_type: string;

	@ApiProperty({ example: 'Balloons party', description: 'Show type' })
	@IsString()
	declare show_type: string;

	@ApiProperty({
		enum: STATUSES,
		default: 'pending',
		description: 'Request status'
	})
	@IsIn(STATUSES)
	status: string;
}
