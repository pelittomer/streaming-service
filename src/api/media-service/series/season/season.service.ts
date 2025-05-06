import { Injectable } from '@nestjs/common';
import { SeasonRepository } from './season.repository';

@Injectable()
export class SeasonService {
  constructor(
    private readonly seasonRepository: SeasonRepository
  ) { }

}
