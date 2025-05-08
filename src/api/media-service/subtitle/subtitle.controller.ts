import { Controller, Get } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';

@Controller('subtitle')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Get()
  getSubtitle(){
    //Retrieves subtitle information for a specific video.
  }

}
