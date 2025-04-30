import { Injectable, NotFoundException } from '@nestjs/common';
import { KidInquireEntity } from '@/modules/inquire/kids/entities/kid.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateKidsInquireDto } from './dto/create-kid.dto';
import { UpdateKidsInquireDto } from './dto/update-kid.dto';
import { TelegramService } from '@/modules/telegram/telegram.service';

@Injectable()
export class KidsInquireService {
	constructor(
		@InjectModel(KidInquireEntity)
		private inquireRepository: typeof KidInquireEntity,
		private readonly telegramService: TelegramService
	) {}

	async create(dto: CreateKidsInquireDto): Promise<KidInquireEntity> {
		await this.telegramService.sendFormattedNotification({
			title: 'Kids Inquire',
			message: `
        Name: ${dto.first_name}
        Email: ${dto.email}
				Phone number: ${dto.phone_number}
				Date: ${dto.date.toLocaleDateString()}
				Masterclass id: ${dto.masterclassId}
				Show for kids: ${dto.showForKids}
        Number of people: ${dto.people_quantity}
				Status: ${dto.status}
      `,
			type: 'inquire'
		});

		return this.inquireRepository.create({ ...dto });
	}

	async findAll(): Promise<KidInquireEntity[]> {
		return this.inquireRepository.findAll();
	}

	async findOne(id: string): Promise<KidInquireEntity> {
		const inquire = await this.inquireRepository.findByPk(id);
		if (!inquire) {
			throw new NotFoundException(`Inquire with ID ${id} not found`);
		}
		return inquire;
	}

	async update(
		id: string,
		dto: UpdateKidsInquireDto
	): Promise<KidInquireEntity> {
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
