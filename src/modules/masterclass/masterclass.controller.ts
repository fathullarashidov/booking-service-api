import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { MasterclassService } from '@/modules/masterclass/masterclass.service';
import { MasterclassEntity } from './entities/masterclass.entity';
import { CreateMasterclassDto } from '@/modules/masterclass/dto/create-masterclass.dto';
import { UpdateMasterclassDto } from '@/modules/masterclass/dto/update-masterclass.dto';

@ApiTags('Masterclass')
@Controller('masterclass')
export class MasterclassController {
	constructor(private readonly masterclassService: MasterclassService) {}

	@Post()
	@ApiOperation({ summary: 'Create new masterclass' })
	@ApiCreatedResponse({
		type: MasterclassEntity,
		description: 'Masterclass successfully created'
	})
	@ApiBadRequestResponse({ description: 'Invalid input data' })
	create(@Body() createDto: CreateMasterclassDto): Promise<MasterclassEntity> {
		return this.masterclassService.create(createDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all inquiries' })
	@ApiOkResponse({
		type: [MasterclassEntity],
		description: 'List of all inquiries'
	})
	findAll(): Promise<MasterclassEntity[]> {
		return this.masterclassService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get masterclass by ID' })
	@ApiOkResponse({
		type: MasterclassEntity,
		description: 'Masterclass details'
	})
	findOne(@Param('id') id: string): Promise<MasterclassEntity> {
		return this.masterclassService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update masterclass details' })
	@ApiOkResponse({
		type: MasterclassEntity,
		description: 'Updated masterclass details'
	})
	update(
		@Param('id') id: string,
		@Body() updateDto: UpdateMasterclassDto
	): Promise<MasterclassEntity> {
		return this.masterclassService.update(id, updateDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete masterclass' })
	@ApiOkResponse({ description: 'Masterclass successfully deleted' })
	remove(@Param('id') id: string): Promise<void> {
		return this.masterclassService.remove(id);
	}
}
