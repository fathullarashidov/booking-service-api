import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEntity } from '@/modules/event/entities/event.entity';
import { EventController } from '@/modules/event/event.controller';
import { EventService } from '@/modules/event/event.service';
import { MediaModule } from '@/modules/media/media.module';

@Module({
	imports: [SequelizeModule.forFeature([EventEntity]), MediaModule],
	controllers: [EventController],
	providers: [EventService],
	exports: [EventService]
})
export class EventModule {}
