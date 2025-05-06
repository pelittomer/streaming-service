import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { ActorRepository } from './actor.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from './schemas/actor.schema';

@Module({
  controllers: [ActorController],
  providers: [ActorService, ActorRepository],
  imports: [
    MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])
  ],
  exports: [ActorRepository]
})
export class ActorModule { }
