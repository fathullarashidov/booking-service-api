import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from '@/modules/auth/entity/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(Admin)
		private adminModel: typeof Admin,
		private jwtService: JwtService
	) {}

	async createAdmin(createAdminDto: CreateAdminDto) {
		return this.adminModel.create({ ...createAdminDto });
	}

	async login(loginDto: LoginDto) {
		const admin = await this.adminModel.findOne({
			where: { username: loginDto.username }
		});
		if (!admin || !(await bcrypt.compare(loginDto.password, admin.password))) {
			throw new UnauthorizedException('Неверный username или пароль');
		}

		const payload = { username: admin.username };
		return {
			access_token: this.jwtService.sign(payload)
		};
	}
}
