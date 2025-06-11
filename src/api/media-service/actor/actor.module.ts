import { Module } from '@nestjs/common';
import { ActorService } from './service/actor.service';
import { ActorController } from './actor.controller';
import { ActorRepository } from './repository/actor.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from './entities/actor.entity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { ActorUtilsService } from './utils/actor-utils.service';

@Module({
  controllers: [ActorController],
  providers: [ActorService, ActorRepository, ActorUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }]),
    SharedUtilsModule, UploadModule
  ],
  exports: [ActorRepository]
})
export class ActorModule { }
