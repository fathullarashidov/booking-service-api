import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KidInquireEntity } from '@/modules/inquire/kids/entities/kid.entity';
import { KidsInquireController } from '@/modules/inquire/kids/kids.controller';
import { KidsInquireService } from '@/modules/inquire/kids/kids.service';
import { TelegramModule } from '@/modules/telegram/telegram.module';

@Module({
	imports: [SequelizeModule.forFeature([KidInquireEntity]), TelegramModule],
	controllers: [KidsInquireController],
	providers: [KidsInquireService]
})
export class KidsModule {}
