import { Module } from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { SubtitleController } from './subtitle.controller';
import { SubtitleRepository } from './subtitle.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtitle, SubtitleSchema } from './schemas/subtitle.schema';

@Module({
  controllers: [SubtitleController],
  providers: [SubtitleService, SubtitleRepository],
  imports: [
    MongooseModule.forFeature([{ name: Subtitle.name, schema: SubtitleSchema }])
  ],
  exports: [SubtitleRepository]

})
export class SubtitleModule { }
