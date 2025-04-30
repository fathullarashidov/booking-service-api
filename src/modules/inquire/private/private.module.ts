import { PrivateInquireEntity } from '@/modules/inquire/private/entities/private.entity';
import { Module } from '@nestjs/common';
import { PrivateInquireController } from '@/modules/inquire/private/private.controller';
import { PrivateInquireService } from '@/modules/inquire/private/private.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegramModule } from '@/modules/telegram/telegram.module';

@Module({
	imports: [SequelizeModule.forFeature([PrivateInquireEntity]), TelegramModule],
	controllers: [PrivateInquireController],
	providers: [PrivateInquireService]
})
export class PrivateModule {}
