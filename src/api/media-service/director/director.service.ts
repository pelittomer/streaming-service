import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DirectorRepository } from './director.repository';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director, DirectorDocument } from './schemas/director.schema';
import { Types } from 'mongoose';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class DirectorService {
  constructor(
    private readonly directorRepository: DirectorRepository
  ) { }

  private async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
    if (!uploadedFile || !uploadedFile.mimetype.startsWith('image/')) {
      throw new BadRequestException(ErrorMessages.INVALID_IMAGE_FILE)
    }
  }

  async addDirector(userInputs: CreateDirectorDto, uploadedImage: Express.Multer.File): Promise<string> {
    this.validateFile(uploadedImage)
    await this.directorRepository.create(userInputs, uploadedImage)
    return ErrorMessages.DIRECTOR_CREATED_SUCCESS
  }

  async getAllDirectors(): Promise<Pick<DirectorDocument, '_id' | 'fullName' | 'profilePicture'>[]> {
    return await this.directorRepository.find()
  }

  async getDirectorById(directorId: Types.ObjectId): Promise<Director> {
    const director = await this.directorRepository.findById(directorId)
    if (!director) {
      throw new NotFoundException(ErrorMessages.DIRECTOR_NOT_FOUND(directorId.toString()))
    }
    return director
  }
}
