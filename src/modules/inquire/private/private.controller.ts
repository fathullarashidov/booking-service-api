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
import { PrivateInquireService } from '@/modules/inquire/private/private.service';
import { PrivateInquireEntity } from '@/modules/inquire/private/entities/private.entity';
import { CreatePrivateInquireDto } from '@/modules/inquire/private/dto/create-private.dto';
import { UpdatePrivateInquireDto } from '@/modules/inquire/private/dto/update-private.dto';

@ApiTags('Private Inquiries')
@Controller('private-inquiries')
export class PrivateInquireController {
	constructor(private readonly inquireService: PrivateInquireService) {}

	@Post()
	@ApiOperation({ summary: 'Create new private inquiry' })
	@ApiCreatedResponse({
		type: PrivateInquireEntity,
		description: 'Inquiry successfully created'
	})
	@ApiBadRequestResponse({ description: 'Invalid input data' })
	create(
		@Body() createDto: CreatePrivateInquireDto
	): Promise<PrivateInquireEntity> {
		return this.inquireService.create(createDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all private inquiries' })
	@ApiOkResponse({
		type: [PrivateInquireEntity],
		description: 'List of all inquiries'
	})
	findAll(): Promise<PrivateInquireEntity[]> {
		return this.inquireService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get inquiry by ID' })
	@ApiOkResponse({
		type: PrivateInquireEntity,
		description: 'Inquiry details'
	})
	findOne(@Param('id') id: string): Promise<PrivateInquireEntity> {
		return this.inquireService.findOne(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update inquiry details' })
	@ApiOkResponse({
		type: PrivateInquireEntity,
		description: 'Updated inquiry details'
	})
	update(
		@Param('id') id: string,
		@Body() updateDto: UpdatePrivateInquireDto
	): Promise<PrivateInquireEntity> {
		return this.inquireService.update(id, updateDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete inquiry' })
	@ApiOkResponse({ description: 'Inquiry successfully deleted' })
	remove(@Param('id') id: string): Promise<void> {
		return this.inquireService.remove(id);
	}
}
