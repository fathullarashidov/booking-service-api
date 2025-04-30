import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ContactUsEntity } from '@/modules/contact-us/entities/contact-us.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContactUsService {
	constructor(
		@InjectModel(ContactUsEntity)
		private contactUsRepository: typeof ContactUsEntity
	) {}
	async create(dto: CreateContactUsDto): Promise<ContactUsEntity> {
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
