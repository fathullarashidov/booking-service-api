import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaController } from '@/modules/media/media.controller';
import { MediaEntity } from '@/modules/media/entities/media.entity';
import { MediaService } from '@/modules/media/media.service';

@Module({
	imports: [SequelizeModule.forFeature([MediaEntity])],
	controllers: [MediaController],
	providers: [MediaService],
	exports: [MediaService]
})
export class MediaModule {}
