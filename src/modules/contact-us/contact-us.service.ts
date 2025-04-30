import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ContactUsEntity } from '@/modules/contact-us/entities/contact-us.entity';
import { InjectModel } from '@nestjs/sequelize';
import { TelegramService } from '@/modules/telegram/telegram.service';

@Injectable()
export class ContactUsService {
	constructor(
		@InjectModel(ContactUsEntity)
		private contactUsRepository: typeof ContactUsEntity,
		private readonly telegramService: TelegramService
	) {}
	async create(dto: CreateContactUsDto): Promise<ContactUsEntity> {
		await this.telegramService.sendFormattedNotification({
			title: 'Contact Us Form Submission',
			message: `
        Name: ${dto.first_name}
        Email: ${dto.email}
       	Phone number: ${dto.phone_number}
				Message: ${dto.your_message}
       	Get in touch: ${dto.getting_touch}
      `,
			type: 'contact'
		});
		return await this.contactUsRepository.create({ ...dto });
	}

	async findAll(): Promise<ContactUsEntity[]> {
		return await this.contactUsRepository.findAll();
	}

	async findByEmail(email: string): Promise<ContactUsEntity[]> {
		return await this.contactUsRepository.findAll({
			where: { email }
		});
	}
}
