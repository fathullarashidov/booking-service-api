import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class TelegramController {
	constructor(private readonly telegramService: TelegramService) {}

	@Post('telegram')
	@ApiOperation({ summary: 'Отправить уведомление в Telegram' })
	@ApiBody({ type: SendNotificationDto })
	@ApiResponse({ status: 200, description: 'Уведомление успешно отправлено' })
	@ApiResponse({ status: 500, description: 'Ошибка отправки уведомления' })
	async sendNotification(@Body() dto: SendNotificationDto) {
		return this.telegramService.sendMessage(dto.message);
	}
}
