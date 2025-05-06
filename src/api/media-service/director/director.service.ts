import { Injectable } from '@nestjs/common';
import { DirectorRepository } from './director.repository';

@Injectable()
export class DirectorService {
  constructor(
    private readonly directorRepository: DirectorRepository
  ) { }

}
