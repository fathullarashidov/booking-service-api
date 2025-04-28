import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookEntity } from '@/modules/book/entities/book.entity';
import { EventService } from '@/modules/event/event.service';
import { EventEntity } from '@/modules/event/entities/event.entity';
import { UpdateBookDto } from '@/modules/book/dto/update-book.dto';

@Injectable()
export class BookService {
	constructor(
		@InjectModel(BookEntity)
		private bookModel: typeof BookEntity,
		private eventService: EventService
	) {}

	async create(createBookDto: CreateBookDto) {
		const event = await this.eventService.findOne(createBookDto.eventId);

		if (!event) {
			throw new NotFoundException(
				`Event with ID ${createBookDto.eventId} not found`
			);
		}

		return await this.bookModel.create({ ...createBookDto });
	}

	findAll() {
		return this.bookModel.findAll({
			include: [EventEntity]
		});
	}

	async findOne(id: string) {
		const book = await this.bookModel.findByPk(id, {
			include: [EventEntity]
		});
		if (!book) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
		return book;
	}

	async update(id: string, dto: UpdateBookDto): Promise<BookEntity> {
		const [affectedCount] = await this.bookModel.update(dto, {
			where: { id }
		});

		if (affectedCount === 0) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
		return this.findOne(id);
	}

	async delete(id: string): Promise<void> {
		const affectedCount = await this.bookModel.destroy({ where: { id } });
		if (affectedCount === 0) {
			throw new NotFoundException(`Event with ID ${id} not found`);
		}
	}
}
