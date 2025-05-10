import { Injectable } from '@nestjs/common';
import { ActorRepository } from './actor.repository';
import { CreateActorDto } from './dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepository: ActorRepository
  ) { }

  async addActor(userInputs: CreateActorDto, uploadedImage: Express.Multer.File): Promise<string> {
    await this.actorRepository.create(userInputs, uploadedImage)
    return 'Actor created successfully.'
  }

}
