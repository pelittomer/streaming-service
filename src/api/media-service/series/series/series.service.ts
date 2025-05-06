import { Injectable } from '@nestjs/common';
import { SeriesRepository } from './series.repository';

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepository: SeriesRepository
  ) { }


}
