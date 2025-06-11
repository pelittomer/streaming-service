import { Injectable } from '@nestjs/common';
import { ActorRepository } from '../repository/actor.repository';
import { Types } from 'mongoose';
import { ActorDocument } from '../entities/types';
import { AddActorParams, IActorService } from './actor.service.interface';
import { ActorUtilsService } from '../utils/actor-utils.service';
import { ACTOR_MESSAGES } from '../constants/actor.message';
import { TFindActor } from '../repository/actor.repository.interface';

@Injectable()
export class ActorService implements IActorService {
  constructor(
    private readonly actorRepository: ActorRepository,
    private readonly actorUtilsService: ActorUtilsService,
  ) { }

  async addActor({ payload, uploadedImage }: AddActorParams): Promise<string> {
    this.actorUtilsService.validateFile(uploadedImage)
    await this.actorRepository.create({ payload, uploadedImage })
    return ACTOR_MESSAGES.ACTOR_CREATED_SUCCESSFULLY_MESSAGE
  }

  getAllActor(): Promise<TFindActor> {
    return this.actorRepository.find()
  }

  getActorById(actorId: Types.ObjectId): Promise<ActorDocument | null> {
    return this.actorRepository.findById(actorId)
  }
}
