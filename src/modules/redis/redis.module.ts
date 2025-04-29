// import { Module } from '@nestjs/common';
// import { RedisModule } from '@nestjs-modules/ioredis';
//
// @Module({
// 	imports: [
// 		RedisModule.forRoot({
// 			type: 'single',
// 			options: {
// 				host: process.env.REDIS_HOST || 'localhost',
// 				port: parseInt(process.env.REDIS_PORT ?? '6379'),
// 				password: process.env.REDIS_PASSWORD,
//
// 				retryStrategy: (times: number) => Math.min(times * 100, 3000),
// 				maxRetriesPerRequest: 3,
// 				enableReadyCheck: true
// 			}
// 		})
// 	],
// 	exports: [RedisModule]
// })
// export class RedisSharedModule {}
