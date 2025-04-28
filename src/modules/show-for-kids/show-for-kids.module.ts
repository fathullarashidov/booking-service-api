import { Module } from '@nestjs/common';
import { ShowForKidsService } from './show-for-kids.service';
import { ShowForKidsController } from './show-for-kids.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShowForKidsEntity } from '@/modules/show-for-kids/entities/show-for-kid.entity';

@Module({
	imports: [SequelizeModule.forFeature([ShowForKidsEntity])],
	controllers: [ShowForKidsController],
	providers: [ShowForKidsService],
	exports: [ShowForKidsService]
})
export class ShowForKidsModule {}
