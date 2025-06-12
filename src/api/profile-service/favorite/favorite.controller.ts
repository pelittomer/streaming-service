import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Request } from 'express';
import { GetFavoriteDto } from './dto/get-favorite.dto';
import { CreateFavoriteDto } from './dto/favorite.dto';
import { Role } from 'src/api/user-service/user/entities/types';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Post()
  addFavorite(
    @Body() payload: CreateFavoriteDto,
    @Req() req: Request
  ) {
    return this.favoriteService.addFavorite({ payload, req })
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Delete('')
  removeFavoriteById(
    @Body() payload: CreateFavoriteDto,
    @Req() req: Request
  ) {
    return this.favoriteService.removeFavoriteById({ payload, req })
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Delete('all')
  removeAllFavorites(
    @Req() req: Request,
    @Query() queryFields: GetFavoriteDto
  ) {
    return this.favoriteService.removeAllFavorites({ req, queryFields })
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Get()
  getUserFavorites(
    @Req() req: Request,
    @Query() queryFields: GetFavoriteDto
  ) {
    return this.favoriteService.getUserFavorites({ req, queryFields })
  }
}
