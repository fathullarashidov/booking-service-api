import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KidInquireEntity } from '@/modules/inquire/kids/entities/kid.entity';
import { KidsInquireController } from '@/modules/inquire/kids/kids.controller';
import { KidsInquireService } from '@/modules/inquire/kids/kids.service';

@Module({
	imports: [SequelizeModule.forFeature([KidInquireEntity])],
	controllers: [KidsInquireController],
	providers: [KidsInquireService]
})
export class KidsModule {}
