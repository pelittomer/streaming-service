import { Module } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { SubtitleController } from './subtitle.controller';

@Module({
  controllers: [SubtitleController],
  providers: [SubtitleService],
})
export class SubtitleModule {}
