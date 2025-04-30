import { Module } from '@nestjs/common';
import { EventModule } from '@/modules/event/event.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEntity } from '@/modules/event/entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from '@/modules/media/media.module';
import { MediaEntity } from '@/modules/media/entities/media.entity';
import { BookEntity } from '@/modules/book/entities/book.entity';
import { BookModule } from '@/modules/book/book.module';
import { PrivateModule } from '@/modules/inquire/private/private.module';
import { PrivateInquireEntity } from '@/modules/inquire/private/entities/private.entity';
import { KidsModule } from '@/modules/inquire/kids/kids.module';
import { KidInquireEntity } from '@/modules/inquire/kids/entities/kid.entity';
import { ShowForKidsModule } from '@/modules/show-for-kids/show-for-kids.module';
import { ShowForKidsEntity } from '@/modules/show-for-kids/entities/show-for-kid.entity';
import { MasterclassEntity } from '@/modules/masterclass/entities/masterclass.entity';
import { MasterclassModule } from '@/modules/masterclass/masterclass.module';
import { FeedbackModule } from '@/modules/feedback/feedback.module';
import { FeedbackEntity } from '@/modules/feedback/entities/feedback.entity';
import { ContactUsModule } from '@/modules/contact-us/contact-us.module';
import { ContactUsEntity } from '@/modules/contact-us/entities/contact-us.entity';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT ?? '5432'),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			models: [
				EventEntity,
				MediaEntity,
				BookEntity,
				PrivateInquireEntity,
				KidInquireEntity,
				ShowForKidsEntity,
				MasterclassEntity,
				FeedbackEntity,
				ContactUsEntity
			],
			autoLoadModels: true,
			synchronize: process.env.MODE === 'development',
			sync: { force: process.env.MODE === 'development' },
			logging: process.env.MODE === 'development' ? console.log : false
		}),
		BookModule,
		EventModule,
		MediaModule,
		PrivateModule,
		KidsModule,
		ShowForKidsModule,
		MasterclassModule,
		FeedbackModule,
		ContactUsModule
	]
})
export class CoreModule {}
