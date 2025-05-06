import { Injectable } from '@nestjs/common';
import { SubtitleRepository } from './subtitle.repository';

@Injectable()
export class SubtitleService {
  constructor(
    private readonly subtitleRepository: SubtitleRepository
  ) { }


}
