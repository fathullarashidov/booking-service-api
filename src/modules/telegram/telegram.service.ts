import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService implements OnModuleInit {
	private bot: TelegramBot;
	private readonly logger = new Logger(TelegramService.name);

	constructor(private configService: ConfigService) {}

	onModuleInit() {
		this.initializeBot();
	}

	private initializeBot() {
		const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

		if (!token) {
			throw new Error('TELEGRAM_BOT_TOKEN is not defined');
		}

		try {
			this.bot = new TelegramBot(token, { polling: false });
			this.logger.log('Telegram bot initialized successfully');
		} catch (error) {
			this.logger.error('Failed to initialize Telegram bot', error.stack);
			throw error;
		}
	}

	async sendMessage(text: string): Promise<void> {
		const chatId = this.configService.get<string>('TELEGRAM_CHAT_ID');

		if (!chatId) {
			throw new Error('TELEGRAM_CHAT_ID is not defined in .env');
		}

		try {
			await this.bot.sendMessage(chatId, text, {
				parse_mode: 'HTML',
				disable_web_page_preview: true
			});
			this.logger.log('Message sent to Telegram');
		} catch (error) {
			this.logger.error('Failed to send Telegram message', error.stack);
			throw new Error('Failed to send Telegram message');
		}
	}

	async sendFormattedNotification(data: {
		title: string;
		message: string;
		type: 'booking' | 'feedback' | 'inquire' | 'contact';
	}): Promise<void> {
		const emojiMap = {
			booking: '📅',
			feedback: '⭐',
			inquire: '📝',
			contact: '📞'
		};

		const formattedMessage = `
      ${emojiMap[data.type]} <b>${data.title}</b>
      --------------------------
      ${data.message}
    `;

		await this.sendMessage(formattedMessage);
	}
}
