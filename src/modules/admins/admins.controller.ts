import {
	ApiBody,
	ApiCreatedResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { AdminsService } from '@/modules/admins/admins.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { CreateAdminDto } from '@/modules/admins/dto/create-admin.dto';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
	constructor(private adminsService: AdminsService) {}

	@Post()
	@ApiOperation({ summary: 'Create new admin' })
	@ApiBody({ type: CreateAdminDto })
	@ApiCreatedResponse({
		type: AdminEntity,
		description: 'Admin created successfully'
	})
	async create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminsService.createAdmin(createAdminDto);
	}

	@Post('/login')
	@ApiOperation({ summary: 'Login' })
	@ApiBody({ type: CreateAdminDto })
	@ApiCreatedResponse({
		type: AdminEntity,
		description: 'Login successful, returns admin details'
	})
	async login(@Body() createAdminDto: CreateAdminDto) {
		return this.adminsService.loginAdmin(createAdminDto);
	}

	@Post('/delete/:id')
	@ApiOperation({ summary: 'Delete admin by ID' })
	async delete(@Param('id') id: string) {
		return this.adminsService.deleteAdmin(id);
	}

	@Get()
	@ApiOperation({
		summary: 'Get all admins',
		description: 'Returns a paginated list of all admins'
	})
	async findAll() {
		return this.adminsService.findAll();
	}
}
