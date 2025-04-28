import { PartialType } from '@nestjs/swagger';
import { CreateShowForKidDto } from './create-show-for-kid.dto';

export class UpdateShowForKidDto extends PartialType(CreateShowForKidDto) {}
