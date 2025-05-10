import { Injectable } from '@nestjs/common';
import { DirectorRepository } from './director.repository';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director, DirectorDocument } from './schemas/director.schema';
import { Types } from 'mongoose';

@Injectable()
export class DirectorService {
  constructor(
    private readonly directorRepository: DirectorRepository
  ) { }

  async addDirector(userInputs: CreateDirectorDto, uploadedImage: Express.Multer.File): Promise<string> {
    await this.directorRepository.create(userInputs, uploadedImage)
    return 'Director created successfully.'
  }

  async getAllDirectors(): Promise<Pick<DirectorDocument, '_id' | 'fullName'>[]> {
    return await this.directorRepository.find()
  }

  async getDirectorById(directorId: Types.ObjectId): Promise<Director | null> {
    return await this.directorRepository.findById(directorId)
  }
}
