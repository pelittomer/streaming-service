import { Controller } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';

@Controller('subtitle')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}


}
