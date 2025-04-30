import {
	IsEmail,
	IsIn,
	IsInt,
	IsISO8601,
	IsPhoneNumber,
	IsString,
	Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

const STATUSES = [
	'in process',
	'declined',
	'cancelled',
	'confirmed',
	'pending',
	'completed',
	'archived'
];

export class CreatePrivateInquireDto {
	@ApiProperty({ example: 'John', description: 'Client first name' })
	@IsString()
	first_name: string;

	@ApiProperty({ example: 'Doe', description: 'Client last name' })
	@IsString()
	last_name: string;

	@ApiProperty({ example: 'john.doe@example.com', description: 'Client email' })
	@IsEmail()
	email: string;

	@ApiProperty({ example: '+1234567890', description: 'Client phone number' })
	@IsPhoneNumber()
	phone_number: string;

	@ApiProperty({ example: 'Tech Corp', description: 'Company name' })
	@IsString()
	company_name: string;

	@ApiProperty({
		example: '2024-12-31',
		description: 'Event date in ISO format (YYYY-MM-DD)'
	})
	@IsISO8601()
	@Type(() => Date)
	date: Date;

	@ApiProperty({
		example: '18:00:00',
		description: 'Event start time in HH:mm:ss format'
	})
	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
	start_time: string;

	@ApiProperty({
		example: '22:00:00',
		description: 'Event end time in HH:mm:ss format'
	})
	@IsString()
	@Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
	end_time: string;

	@ApiProperty({ example: 'Corporate Meeting', description: 'Event type' })
	@IsString()
	event_type: string;

	@ApiProperty({ example: 50, description: 'Number of attendees' })
	@IsInt()
	people_quantity: number;

	@ApiProperty({
		example: 'Special requirements...',
		description: 'Additional info'
	})
	@IsString()
	additional_info: string;

	@ApiProperty({
		enum: STATUSES,
		default: 'pending',
		description: 'Request status'
	})
	@IsIn(STATUSES)
	status: string;
}
