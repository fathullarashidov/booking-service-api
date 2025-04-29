import { FeedbackEntity } from '@/modules/feedback/entities/feedback.entity';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FeedbackController } from '@/modules/feedback/feedback.controller';
import { FeedbackService } from '@/modules/feedback/feedback.service';

@Module({
	imports: [SequelizeModule.forFeature([FeedbackEntity])],
	controllers: [FeedbackController],
	providers: [FeedbackService],
	exports: [FeedbackService]
})
export class FeedbackModule {}
