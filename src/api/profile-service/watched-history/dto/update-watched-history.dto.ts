import { PartialType } from '@nestjs/swagger';
import { CreateWatchedHistoryDto } from './create-watched-history.dto';

export class UpdateWatchedHistoryDto extends PartialType(CreateWatchedHistoryDto) {}
