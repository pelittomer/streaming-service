import { BadRequestException, Injectable } from '@nestjs/common';
import { ActorRepository } from './actor.repository';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorDocument } from './schemas/actor.schema';
import { Types } from 'mongoose';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepository: ActorRepository
  ) { }
  private async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
    if (!uploadedFile || !uploadedFile.mimetype.startsWith('image/')) {
      throw new BadRequestException(ErrorMessages.INVALID_IMAGE_FILE)
    }
  }

  async addActor(userInputs: CreateActorDto, uploadedImage: Express.Multer.File): Promise<string> {
    this.validateFile(uploadedImage)
    await this.actorRepository.create(userInputs, uploadedImage)
    return ErrorMessages.ACTOR_CREATED_SUCCESSFULLY_MESSAGE
  }

  getAllActor(): Promise<Pick<ActorDocument, '_id' | 'fullName' | 'profilePicture'>[]> {
    return this.actorRepository.find()
  }

  getActorById(actorId: Types.ObjectId): Promise<ActorDocument | null> {
    return this.actorRepository.findById(actorId)
  }
}
