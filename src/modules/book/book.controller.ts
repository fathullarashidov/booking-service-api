import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { BookService } from './book.service';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { CreateBookDto } from '@/modules/book/dto/create-book.dto';
import { BookEntity } from '@/modules/book/entities/book.entity';
import { UpdateBookDto } from '@/modules/book/dto/update-book.dto';

@ApiTags('Booking')
@Controller('book')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Post()
	@ApiOperation({ summary: 'Create new booking' })
	@ApiBody({ type: CreateBookDto })
	@ApiCreatedResponse({
		type: BookEntity,
		description: 'Booking created'
	})
	async create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
		return this.bookService.create(createBookDto);
	}

	@Get()
	@ApiOperation({
		summary: 'Get all bookings',
		description: 'Returns list of all available bookings'
	})
	@ApiOkResponse({
		type: [BookEntity],
		description: 'Booking list retrieved successfully'
	})
	findAll(): Promise<BookEntity[]> {
		return this.bookService.findAll();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Get booking by ID',
		description: 'Returns single booking by its UUID'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Booking UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiOkResponse({ type: BookEntity, description: 'Booking found' })
	@ApiNotFoundResponse({ description: 'Booking not found' })
	findOne(@Param('id') id: string): Promise<BookEntity> {
		return this.bookService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({
		summary: 'Update booking',
		description: 'Updates existing booking data'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Booking UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiBody({ type: UpdateBookDto })
	@ApiOkResponse({
		type: BookEntity,
		description: 'Booking updated successfully'
	})
	@ApiNotFoundResponse({ description: 'Booking not found' })
	@ApiBadRequestResponse({ description: 'Invalid input data format' })
	update(
		@Param('id') id: string,
		@Body() updateBookDto: UpdateBookDto
	): Promise<BookEntity> {
		return this.bookService.update(id, updateBookDto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete booking',
		description: 'Permanently removes booking by ID'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Booking UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiOkResponse({ description: 'Booking successfully deleted' })
	@ApiNotFoundResponse({ description: 'Booking not found' })
	remove(@Param('id') id: string): Promise<void> {
		return this.bookService.delete(id);
	}
}
