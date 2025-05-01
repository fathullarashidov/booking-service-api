import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
	@IsString()
	username: string;

	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
