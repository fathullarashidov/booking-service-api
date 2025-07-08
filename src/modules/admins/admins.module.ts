import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminsController } from '@/modules/admins/admins.controller';
import { AdminsService } from '@/modules/admins/admins.service';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Module({
	imports: [SequelizeModule.forFeature([AdminEntity])],
	controllers: [AdminsController],
	providers: [AdminsService],
	exports: [AdminsService]
})
export class AdminsModule {}
