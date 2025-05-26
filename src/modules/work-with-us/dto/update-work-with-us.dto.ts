// dto/update-work-with-us.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkWithUsDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	first_name?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	phone_number?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	email?: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	cover_letter?: string;
}
