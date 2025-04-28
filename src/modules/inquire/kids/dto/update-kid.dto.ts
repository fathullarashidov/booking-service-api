import { PartialType } from '@nestjs/swagger';
import { CreateKidsInquireDto } from '@/modules/inquire/kids/dto/create-kid.dto';

export class UpdateKidsInquireDto extends PartialType(CreateKidsInquireDto) {}
