import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';
import { ListRepository } from './list.repository';

@Module({
  controllers: [ListController],
  providers: [ListService, ListRepository],
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }])
  ],
  exports: [ListRepository]
})
export class ListModule { }
