import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { SeasonRepository } from './season.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Season, SeasonSchema } from './schemas/season.schema';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService, SeasonRepository],
  imports: [
    MongooseModule.forFeature([{ name: Season.name, schema: SeasonSchema }])
  ],
  exports: [SeasonRepository]
})
export class SeasonModule { }
