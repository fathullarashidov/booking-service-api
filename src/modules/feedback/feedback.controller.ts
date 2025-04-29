import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { FeedbackEntity } from './entities/feedback.entity';
import { CreateFeedbackDto } from '@/modules/feedback/dto/create-feedback.dto';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Post()
	@ApiOperation({ summary: 'Создать новый отзыв' })
	@ApiResponse({
		status: 201,
		type: FeedbackEntity,
		description: 'Отзыв успешно создан'
	})
	create(@Body() createDto: CreateFeedbackDto): Promise<FeedbackEntity> {
		return this.feedbackService.create(createDto);
	}

	@Get()
	@ApiOperation({ summary: 'Получить все отзывы' })
	@ApiQuery({
		name: 'email',
		required: false,
		description: 'Фильтр по email'
	})
	@ApiResponse({
		status: 200,
		type: [FeedbackEntity],
		description: 'Список отзывов'
	})
	findAll(@Query('email') email?: string): Promise<FeedbackEntity[]> {
		return email
			? this.feedbackService.findByEmail(email)
			: this.feedbackService.findAll();
	}
}
