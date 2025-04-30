import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMediaDto {
	@ApiProperty({ required: false, description: 'Original file name' })
	@IsOptional()
	@IsString()
	originalName?: string;

	@ApiProperty({ required: false, description: 'Custom metadata' })
	@IsOptional()
	@IsString()
	customMetadata?: string;
}
