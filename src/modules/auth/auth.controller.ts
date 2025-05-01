import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Post('admin')
	@UseGuards(JwtAuthGuard) // Только авторизованные админы могут создавать новых
	async createAdmin(@Body() createAdminDto: CreateAdminDto) {
		return this.authService.createAdmin(createAdminDto);
	}
}
