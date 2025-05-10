import { Injectable } from '@nestjs/common';
import { DirectorRepository } from './director.repository';
import { CreateDirectorDto } from './dto/create-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    private readonly directorRepository: DirectorRepository
  ) { }

  async addDirector(userInputs: CreateDirectorDto, uploadedImage: Express.Multer.File): Promise<string> {
    await this.directorRepository.create(userInputs, uploadedImage)
    return 'Director created successfully.'
  }

}
