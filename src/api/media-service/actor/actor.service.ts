import { Injectable } from '@nestjs/common';
import { ActorRepository } from './actor.repository';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorDocument } from './schemas/actor.schema';

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepository: ActorRepository
  ) { }

  async addActor(userInputs: CreateActorDto, uploadedImage: Express.Multer.File): Promise<string> {
    await this.actorRepository.create(userInputs, uploadedImage)
    return 'Actor created successfully.'
  }

  getAllActor(): Promise<Pick<ActorDocument, '_id' | 'fullName' | 'profilePicture'>[]> {
    return this.actorRepository.find()
  }
  
}
