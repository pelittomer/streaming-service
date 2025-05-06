import { Injectable } from '@nestjs/common';
import { ActorRepository } from './actor.repository';

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepository: ActorRepository
  ) { }

}
