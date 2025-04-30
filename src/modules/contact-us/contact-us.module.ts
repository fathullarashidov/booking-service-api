import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactUsEntity } from '@/modules/contact-us/entities/contact-us.entity';
import { TelegramModule } from '@/modules/telegram/telegram.module';

@Module({
	imports: [SequelizeModule.forFeature([ContactUsEntity]), TelegramModule],
	controllers: [ContactUsController],
	providers: [ContactUsService],
	exports: [ContactUsService]
})
export class ContactUsModule {}
