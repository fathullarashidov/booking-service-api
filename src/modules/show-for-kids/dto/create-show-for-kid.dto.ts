import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShowForKidDto {
	@ApiProperty({
		example: 'Postcard Creation',
		description: 'Postcard Creation'
	})
	@IsString()
	title: string;

	@ApiProperty({
		example: 'Learn how to made postcard by yourself in ad easy way',
		description: 'Masterclass description'
	})
	@IsString()
	description: string;
}
