import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(CoreModule);

	const config = new DocumentBuilder()
		.setTitle('Restaurant API')
		.setDescription('API for restaurant management system')
		.setVersion('1.0')
		.addTag('Events')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	app.useStaticAssets(join(process.cwd(), 'media'), {
		prefix: '/media'
	});

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
