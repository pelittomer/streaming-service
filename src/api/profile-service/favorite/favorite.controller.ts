import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/types';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PartialFavoriteDto } from './dto/favorite.dto';
import { Request } from 'express';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Post()
  addFavorite(
    @Body() userInputs: PartialFavoriteDto,
    @Req() req: Request
  ) {
    return this.favoriteService.addFavorite(userInputs, req)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Delete('')
  removeFavoriteById(
    @Query() query: PartialFavoriteDto,
    @Req() req: Request
  ) {
    return this.favoriteService.removeFavoriteById(query, req)
  }

  @Delete('all')
  removeAllFavorites() {
    //Removes all favorite items belonging to the currently authenticated user.
  }

  @Get()
  getUserFavorites() {
    //Retrieves a list of all favorite items belonging to the currently authenticated user.
  }
}
