import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateShowForKidDto } from '@/modules/show-for-kids/dto/create-show-for-kid.dto';
import { UpdateShowForKidDto } from '@/modules/show-for-kids/dto/update-show-for-kid.dto';
import { ShowForKidsEntity } from '@/modules/show-for-kids/entities/show-for-kid.entity';

@Injectable()
export class ShowForKidsService {
	constructor(
		@InjectModel(ShowForKidsEntity)
		private showForKidsRepository: typeof ShowForKidsEntity
	) {}

	async create(dto: CreateShowForKidDto): Promise<ShowForKidsEntity> {
		return this.showForKidsRepository.create({ ...dto });
	}

	async findAll(): Promise<ShowForKidsEntity[]> {
		return this.showForKidsRepository.findAll();
	}

	async findOne(id: string): Promise<ShowForKidsEntity> {
		const showForKids = await this.showForKidsRepository.findByPk(id);
		if (!showForKids) {
			throw new NotFoundException(`Show for kids with ID ${id} not found`);
		}
		return showForKids;
	}

	async update(
		id: string,
		dto: UpdateShowForKidDto
	): Promise<ShowForKidsEntity> {
		const [affectedCount] = await this.showForKidsRepository.update(dto, {
			where: { id }
		});

		if (affectedCount === 0) {
			throw new NotFoundException(`Show for kids with ID ${id} not found`);
		}
		return this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const affectedCount = await this.showForKidsRepository.destroy({
			where: { id }
		});
		if (affectedCount === 0) {
			throw new NotFoundException(`Show for kids with ID ${id} not found`);
		}
	}
}
