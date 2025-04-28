import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventModule } from '@/modules/event/event.module';
import { BookEntity } from '@/modules/book/entities/book.entity';

@Module({
	imports: [SequelizeModule.forFeature([BookEntity]), EventModule],
	controllers: [BookController],
	providers: [BookService],
	exports: [BookService]
})
export class BookModule {}
