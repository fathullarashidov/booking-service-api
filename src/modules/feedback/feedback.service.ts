import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeedbackEntity } from './entities/feedback.entity';
import { CreateFeedbackDto } from '@/modules/feedback/dto/create-feedback.dto';
import { TelegramService } from '@/modules/telegram/telegram.service';

@Injectable()
export class FeedbackService {
	constructor(
		@InjectModel(FeedbackEntity)
		private feedbackRepository: typeof FeedbackEntity,
		private readonly telegramService: TelegramService
	) {}

	async create(dto: CreateFeedbackDto): Promise<FeedbackEntity> {
		await this.telegramService.sendFormattedNotification({
			title: 'New feedback received!',
			message: `
        Name: ${dto.first_name}
        Last name: ${dto.last_name}
        Email: ${dto.email}
        Additional info: ${dto.additional_info}
        Rate: ${dto.rate}
      `,
			type: 'feedback'
		});

		return this.feedbackRepository.create({ ...dto });
	}

	async findAll(): Promise<FeedbackEntity[]> {
		return this.feedbackRepository.findAll({
			order: [['created_at', 'DESC']]
		});
	}

	async findByEmail(email: string): Promise<FeedbackEntity[]> {
		return this.feedbackRepository.findAll({
			where: { email },
			order: [['created_at', 'DESC']]
		});
	}
}
