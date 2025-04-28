import { Module } from '@nestjs/common';
import { MasterclassService } from './masterclass.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MasterclassEntity } from '@/modules/masterclass/entities/masterclass.entity';
import { MasterclassController } from './masterclass.controller';

@Module({
	imports: [SequelizeModule.forFeature([MasterclassEntity])],
	controllers: [MasterclassController],
	providers: [MasterclassService],
	exports: [MasterclassService]
})
export class MasterclassModule {}
