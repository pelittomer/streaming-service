import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @Post()
  addFavorite() {
    //Allows the authenticated user to add a new item to their favorites.
  }

  @Delete(':id')
  removeFavoriteById() {
    //Removes a specific favorite item identified by the provided ID from the authenticated user's favorites.
  }

  @Delete()
  removeAllFavorites() {
    //Removes all favorite items belonging to the currently authenticated user.
  }

  @Get()
  getUserFavorites() {
    //Retrieves a list of all favorite items belonging to the currently authenticated user.
  }
}
