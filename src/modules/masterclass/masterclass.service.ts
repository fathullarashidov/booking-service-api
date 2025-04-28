import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterclassDto } from './dto/create-masterclass.dto';
import { UpdateMasterclassDto } from './dto/update-masterclass.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MasterclassEntity } from '@/modules/masterclass/entities/masterclass.entity';

@Injectable()
export class MasterclassService {
	constructor(
		@InjectModel(MasterclassEntity)
		private masterclassRepository: typeof MasterclassEntity
	) {}

	async create(dto: CreateMasterclassDto): Promise<MasterclassEntity> {
		return this.masterclassRepository.create({ ...dto });
	}

	async findAll(): Promise<MasterclassEntity[]> {
		return this.masterclassRepository.findAll();
	}

	async findOne(id: string): Promise<MasterclassEntity> {
		const masterclass = await this.masterclassRepository.findByPk(id);
		if (!masterclass) {
			throw new NotFoundException(`Masterclass with ID ${id} not found`);
		}
		return masterclass;
	}

	async update(
		id: string,
		dto: UpdateMasterclassDto
	): Promise<MasterclassEntity> {
		const [affectedCount] = await this.masterclassRepository.update(dto, {
			where: { id }
		});

		if (affectedCount === 0) {
			throw new NotFoundException(`Masterclass with ID ${id} not found`);
		}
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const affectedCount = await this.masterclassRepository.destroy({
			where: { id }
		});
		if (affectedCount === 0) {
			throw new NotFoundException(`Masterclass with ID ${id} not found`);
		}
	}
}
