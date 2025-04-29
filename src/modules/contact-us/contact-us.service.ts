// import { Injectable } from '@nestjs/common';
// import { CreateContactUsDto } from './dto/create-contact-us.dto';
// import { UpdateContactUsDto } from './dto/update-contact-us.dto';
// import { ContactUsEntity } from '@/modules/contact-us/entities/contact-us.entity';
// import { InjectModel } from '@nestjs/sequelize';
//
// @Injectable()
// export class ContactUsService {
// 	constructor(
// 		@InjectModel(ContactUsEntity)
// 		private contactUsModel: typeof ContactUsEntity
// 	) {}
// 	create(createContactUsDto: CreateContactUsDto) {
// 		// return this.contactUsModel.create({ ...createContactUsDto });
// 	}
//
// 	findAll() {
// 		return `This action returns all contactUs`;
// 	}
//
// 	findOne(id: number) {
// 		return `This action returns a #${id} contactUs`;
// 	}
//
// 	update(id: number, updateContactUsDto: UpdateContactUsDto) {
// 		return `This action updates a #${id} contactUs`;
// 	}
//
// 	remove(id: number) {
// 		return `This action removes a #${id} contactUs`;
// 	}
// }
