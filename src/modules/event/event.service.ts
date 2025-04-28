import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from '@/modules/event/dto/create-event.dto';
import { EventEntity } from '@/modules/event/entities/event.entity';
import { UpdateEventDto } from '@/modules/event/dto/update-event.dto';
import { MediaService } from '@/modules/media/media.service';
import { MediaEntity } from '@/modules/media/entities/media.entity';

@Injectable()
export class EventService {
	constructor(
		@InjectModel(EventEntity)
		private eventModel: typeof EventEntity,
		private mediaService: MediaService
	) {}

	async create(dto: CreateEventDto): Promise<EventEntity> {
		await this.mediaService.findById(dto.mediaId);

		return this.eventModel.create({ ...dto });
	}

	async findAll(): Promise<EventEntity[]> {
		return this.eventModel.findAll({
			include: [MediaEntity]
		});
	}

	async findOne(id: string): Promise<EventEntity> {
		const event = await this.eventModel.findByPk(id, {
			include: [MediaEntity]
		});
		if (!event) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
		return event;
	}

	async update(id: string, dto: UpdateEventDto): Promise<EventEntity> {
		const [affectedCount] = await this.eventModel.update(dto, {
			where: { id }
		});

		if (affectedCount === 0) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
		return this.findOne(id);
	}

	async delete(id: string): Promise<void> {
		const affectedCount = await this.eventModel.destroy({ where: { id } });
		if (affectedCount === 0) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
	}
}
