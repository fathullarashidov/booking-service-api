import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { EventService } from '@/modules/event/event.service';
import { EventEntity } from '@/modules/event/entities/event.entity';
import { CreateEventDto } from '@/modules/event/dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
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

@ApiTags('Events')
@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventService) {}

	@Post()
	@ApiOperation({ summary: 'Create new event' })
	@ApiBody({ type: CreateEventDto })
	@ApiCreatedResponse({
		type: EventEntity,
		description: 'Event created with media relation'
	})
	async create(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
		return this.eventService.create(createEventDto);
	}

	@Get('all')
	@ApiOperation({
		summary: 'Get all events',
		description: 'Returns list of all available events'
	})
	@ApiOkResponse({
		type: [EventEntity],
		description: 'Events list retrieved successfully'
	})
	findAll(): Promise<EventEntity[]> {
		return this.eventService.findAll();
	}

	@Get()
	@ApiOperation({
		summary: 'Get all visible events',
		description: 'Returns list of all visible available events'
	})
	@ApiOkResponse({
		type: [EventEntity],
		description: 'Events list retrieved successfully'
	})
	findVisible(): Promise<EventEntity[]> {
		return this.eventService.findVisible();
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Get event by ID',
		description: 'Returns single event by its UUID'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Event UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiOkResponse({ type: EventEntity, description: 'Event found' })
	@ApiNotFoundResponse({ description: 'Event not found' })
	findOne(@Param('id') id: string): Promise<EventEntity> {
		return this.eventService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({
		summary: 'Update event',
		description: 'Updates existing event data'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Event UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiBody({ type: UpdateEventDto })
	@ApiOkResponse({
		type: EventEntity,
		description: 'Event updated successfully'
	})
	@ApiNotFoundResponse({ description: 'Event not found' })
	@ApiBadRequestResponse({ description: 'Invalid input data format' })
	update(
		@Param('id') id: string,
		@Body() updateEventDto: UpdateEventDto
	): Promise<EventEntity> {
		return this.eventService.update(id, updateEventDto);
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Delete event',
		description: 'Permanently removes event by ID'
	})
	@ApiParam({
		name: 'id',
		type: String,
		description: 'Event UUID',
		example: 'a58db8b9-04ab-4d78-9e78-18cae3a3a1e5'
	})
	@ApiOkResponse({ description: 'Event successfully deleted' })
	@ApiNotFoundResponse({ description: 'Event not found' })
	remove(@Param('id') id: string): Promise<void> {
		return this.eventService.delete(id);
	}
}
