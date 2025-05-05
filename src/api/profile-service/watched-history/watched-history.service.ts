import { Injectable } from '@nestjs/common';
import { CreateWatchedHistoryDto } from './dto/create-watched-history.dto';
import { UpdateWatchedHistoryDto } from './dto/update-watched-history.dto';

@Injectable()
export class WatchedHistoryService {
  create(createWatchedHistoryDto: CreateWatchedHistoryDto) {
    return 'This action adds a new watchedHistory';
  }

  findAll() {
    return `This action returns all watchedHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} watchedHistory`;
  }

  update(id: number, updateWatchedHistoryDto: UpdateWatchedHistoryDto) {
    return `This action updates a #${id} watchedHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchedHistory`;
  }
}
