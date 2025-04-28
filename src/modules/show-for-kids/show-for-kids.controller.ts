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
import { ShowForKidsEntity } from '@/modules/show-for-kids/entities/show-for-kid.entity';
import { CreateShowForKidDto } from '@/modules/show-for-kids/dto/create-show-for-kid.dto';
import { ShowForKidsService } from '@/modules/show-for-kids/show-for-kids.service';
import { UpdateShowForKidDto } from '@/modules/show-for-kids/dto/update-show-for-kid.dto';

@ApiTags('Show for kids')
@Controller('show-for-kids')
export class ShowForKidsController {
	constructor(private readonly showForKids: ShowForKidsService) {}

	@Post()
	@ApiOperation({ summary: 'Create new show for kids' })
	@ApiCreatedResponse({
		type: ShowForKidsEntity,
		description: 'ShowForKids successfully created'
	})
	@ApiBadRequestResponse({ description: 'Invalid input data' })
	create(@Body() createDto: CreateShowForKidDto): Promise<ShowForKidsEntity> {
		return this.showForKids.create(createDto);
	}

	@Get()
	@ApiOperation({ summary: 'Get all shows for kids' })
	@ApiOkResponse({
		type: [ShowForKidsEntity],
		description: 'List of all shows for kids'
	})
	findAll(): Promise<ShowForKidsEntity[]> {
		return this.showForKids.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get show for kids by ID' })
	@ApiOkResponse({
		type: ShowForKidsEntity,
		description: 'ShowForKids details'
	})
	findOne(@Param('id') id: string): Promise<ShowForKidsEntity> {
		return this.showForKids.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update show for kids details' })
	@ApiOkResponse({
		type: ShowForKidsEntity,
		description: 'Updated show for kids details'
	})
	update(
		@Param('id') id: string,
		@Body() updateDto: UpdateShowForKidDto
	): Promise<ShowForKidsEntity> {
		return this.showForKids.update(id, updateDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete show for kids' })
	@ApiOkResponse({ description: 'Show for kids successfully deleted' })
	remove(@Param('id') id: string): Promise<void> {
		return this.showForKids.remove(id);
	}
}
