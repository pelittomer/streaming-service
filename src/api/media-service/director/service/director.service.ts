import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { DIRECTOR_MESSAGES } from '../constants/director.message';
import { DirectorRepository } from '../repository/director.repository';
import { Director } from '../entities/director.entity';
import { DirectorUtilsService } from '../utils/director-utils.service';
import { AddDirectorParams, IDirectorService } from './director.service.interface';
import { TFindDirector } from '../repository/director.repository.interface';

@Injectable()
export class DirectorService implements IDirectorService {
  constructor(
    private readonly directorRepository: DirectorRepository,
    private readonly directorUtilsService: DirectorUtilsService,
  ) { }

  async addDirector({ payload, uploadedImage }: AddDirectorParams): Promise<string> {
    this.directorUtilsService.validateFile(uploadedImage)
    await this.directorRepository.create({ payload, uploadedImage })
    return DIRECTOR_MESSAGES.DIRECTOR_CREATED_SUCCESS
  }

  async getAllDirectors(): Promise<TFindDirector> {
    return await this.directorRepository.find()
  }

  async getDirectorById(directorId: Types.ObjectId): Promise<Director> {
    return this.directorUtilsService.getExistingDirector(directorId)
  }
}
