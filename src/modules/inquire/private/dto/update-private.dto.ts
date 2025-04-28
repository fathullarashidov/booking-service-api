import { PartialType } from '@nestjs/swagger';
import { CreatePrivateInquireDto } from '@/modules/inquire/private/dto/create-private.dto';

export class UpdatePrivateInquireDto extends PartialType(
	CreatePrivateInquireDto
) {}
