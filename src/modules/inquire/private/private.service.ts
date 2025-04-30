import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PrivateInquireEntity } from '@/modules/inquire/private/entities/private.entity';
import { CreatePrivateInquireDto } from '@/modules/inquire/private/dto/create-private.dto';
import { UpdatePrivateInquireDto } from '@/modules/inquire/private/dto/update-private.dto';
import { TelegramService } from '@/modules/telegram/telegram.service';

@Injectable()
export class PrivateInquireService {
	constructor(
		@InjectModel(PrivateInquireEntity)
		private inquireRepository: typeof PrivateInquireEntity,
		private readonly telegramService: TelegramService
	) {}

	async create(dto: CreatePrivateInquireDto): Promise<PrivateInquireEntity> {
		const date = new Date(dto.date);
		const startTime = new Date(dto.start_time);
		const endTime = new Date(dto.end_time);

		await this.telegramService.sendFormattedNotification({
			title: 'Private Inquire',
			message: `
        Name: ${dto.first_name}
        Name: ${dto.last_name}
				Company name: ${dto.company_name}
        Email: ${dto.email}
				Phone number: ${dto.phone_number}
				Event type: ${dto.event_type}
				Date: ${date.toLocaleDateString('en-US')}
      	Time: ${startTime.toLocaleTimeString('en-US')} - ${endTime.toLocaleTimeString('en-US')}	
        Number of people: ${dto.people_quantity}
        Additional info: ${dto.additional_info}
				Status: ${dto.status}
      `,
			type: 'inquire'
		});

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
