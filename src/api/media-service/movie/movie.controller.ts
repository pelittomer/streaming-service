import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { PartialGetMovieDto } from './dto/get-movie.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Role } from 'src/api/user-service/user/entities/types';
import { MovieService } from './service/movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UploadImage()
  addMovie(
    @Body() payload: CreateMovieDto,
    @UploadedFile() uploadedFile: Express.Multer.File
  ) {
    return this.movieService.addMovie({ payload, uploadedFile })
  }

  @Get()
  getAllMovies(@Query() query: PartialGetMovieDto) {
    return this.movieService.getAllMovies(query)
  }

  @Get(':id')
  getMovieById(
    @Param('id', ParseObjectIdPipe) movieId: Types.ObjectId
  ) {
    return this.movieService.getMovieById(movieId)
  }

}
