import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PrivateInquireEntity } from '@/modules/inquire/private/entities/private.entity';
import { CreatePrivateInquireDto } from '@/modules/inquire/private/dto/create-private.dto';
import { UpdatePrivateInquireDto } from '@/modules/inquire/private/dto/update-private.dto';

@Injectable()
export class PrivateInquireService {
	constructor(
		@InjectModel(PrivateInquireEntity)
		private inquireRepository: typeof PrivateInquireEntity
	) {}

	async create(dto: CreatePrivateInquireDto): Promise<PrivateInquireEntity> {
		return this.inquireRepository.create({ ...dto });
	}

	async findAll(): Promise<PrivateInquireEntity[]> {
		return this.inquireRepository.findAll();
	}

	async findOne(id: string): Promise<PrivateInquireEntity> {
		const inquire = await this.inquireRepository.findByPk(id);
		if (!inquire) {
			throw new NotFoundException(`Inquire with ID ${id} not found`);
		}
		return inquire;
	}

	async update(
		id: string,
		dto: UpdatePrivateInquireDto
	): Promise<PrivateInquireEntity> {
		const [affectedCount] = await this.inquireRepository.update(dto, {
			where: { id }
		});

		if (affectedCount === 0) {
			throw new NotFoundException(`Inquire with ID ${id} not found`);
		}
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const affectedCount = await this.inquireRepository.destroy({
			where: { id }
		});
		if (affectedCount === 0) {
			throw new NotFoundException(`Inquire with ID ${id} not found`);
		}
	}
}
