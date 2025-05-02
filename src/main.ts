import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(CoreModule);

	app.enableCors({
		origin: [
			'https://gosht.maksimovich.uz',
			'https://www.gosht.maksimovich.uz',
			'http://localhost:5173'
		],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
		allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
	});

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // удаляет лишние поля, не описанные в DTO
			forbidNonWhitelisted: true, // выбрасывает ошибку, если есть лишние поля
			transform: true, // автоматически преобразует типы (например, строку в число)
			disableErrorMessages: false // включает сообщения об ошибках
		})
	);

	app.setGlobalPrefix('api/v1');

	const config = new DocumentBuilder()
		.setTitle('Restaurant API v1')
		.setDescription('API for restaurant management system documentation v1')
		.setVersion('1.0')
		.addTag('Events')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/v1/docs', app, document);

	app.useStaticAssets(join(process.cwd(), 'media'), {
		prefix: '/media'
	});

	await app.listen(process.env.PORT ?? 3000, '127.0.0.1');
}
bootstrap();
