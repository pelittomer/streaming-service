import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository
  ) { }

}
