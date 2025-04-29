import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeedbackEntity } from './entities/feedback.entity';
import { CreateFeedbackDto } from '@/modules/feedback/dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
	constructor(
		@InjectModel(FeedbackEntity)
		private feedbackRepository: typeof FeedbackEntity
	) {}

	async create(dto: CreateFeedbackDto): Promise<FeedbackEntity> {
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
