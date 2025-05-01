import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { KidsInquireService } from '@/modules/inquire/kids/kids.service';
import { KidInquireEntity } from '@/modules/inquire/kids/entities/kid.entity';
import { CreateKidsInquireDto } from '@/modules/inquire/kids/dto/create-kid.dto';
import { UpdateKidsInquireDto } from '@/modules/inquire/kids/dto/update-kid.dto';

@ApiTags('Kids Inquiries')
@Controller('kids-inquiries')
export class KidsInquireController {
	constructor(private readonly inquireService: KidsInquireService) {}

	@Post()
	@ApiOperation({ summary: 'Create new kids inquiry' })
	@ApiCreatedResponse({
		type: KidInquireEntity,
		description: 'Inquiry successfully created'
	})
	@ApiBadRequestResponse({ description: 'Invalid input data' })
	create(@Body() createDto: CreateKidsInquireDto): Promise<KidInquireEntity> {
		return this.inquireService.create(createDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all kids inquiries' })
	@ApiOkResponse({
		type: [KidInquireEntity],
		description: 'List of all inquiries'
	})
	findAll(): Promise<KidInquireEntity[]> {
		return this.inquireService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get inquiry by ID' })
	@ApiOkResponse({
		type: KidInquireEntity,
		description: 'Inquiry details'
	})
	findOne(@Param('id') id: string): Promise<KidInquireEntity> {
		return this.inquireService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update inquiry details' })
	@ApiOkResponse({
		type: KidInquireEntity,
		description: 'Updated inquiry details'
	})
	update(
		@Param('id') id: string,
		@Body() updateDto: UpdateKidsInquireDto
	): Promise<KidInquireEntity> {
		return this.inquireService.update(id, updateDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete inquiry' })
	@ApiOkResponse({ description: 'Inquiry successfully deleted' })
	remove(@Param('id') id: string): Promise<void> {
		return this.inquireService.remove(id);
	}
}
