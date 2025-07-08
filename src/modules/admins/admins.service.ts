import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { CreateAdminDto } from '@/modules/admins/dto/create-admin.dto';

@Injectable()
export class AdminsService {
	constructor(
		@InjectModel(AdminEntity)
		private adminsModel: typeof AdminEntity
	) {}

	async createAdmin(dto: CreateAdminDto): Promise<AdminEntity> {
		return await this.adminsModel.create({ ...dto });
	}

	async loginAdmin(dto: CreateAdminDto): Promise<AdminEntity> {
		const admin = await this.adminsModel.findOne({
			where: { username: dto.username }
		});
		if (!admin || admin.password !== dto.password) {
			throw new Error('Invalid username or password');
		}
		return admin;
	}

	async deleteAdmin(id: string): Promise<void> {
		const admin = await this.adminsModel.findByPk(id);
		if (!admin) {
			throw new Error('Admin not found');
		}
		await admin.destroy();
	}

	async findAll(page = 1, limit = 10) {
		const result = await this.adminsModel.findAndCountAll({
			limit,
			offset: (page - 1) * limit,
			order: [['createdAt', 'DESC']]
		});

		return {
			data: result.rows,
			total: result.count
		};
	}
}
