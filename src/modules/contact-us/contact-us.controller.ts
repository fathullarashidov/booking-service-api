import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
	constructor(private readonly contactUsService: ContactUsService) {}

	@Post()
	create(@Body() createContactUsDto: CreateContactUsDto) {
		return this.contactUsService.create(createContactUsDto);
	}

	@Get()
	findAll() {
		return this.contactUsService.findAll();
	}

	@Get(':email')
	findOne(@Param('email') email: string) {
		return this.contactUsService.findByEmail(email);
	}
}
