import { Controller, Get, Post } from '@nestjs/common';
import { DirectorService } from './director.service';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) { }

  @Post()
  addDirector() {
    //Adds a new director to the database.
  }

  @Get()
  getAllDirectors() {
    //Retrieves a list of all available directors.
  }

  @Get(':id')
  getDirectorById() {
    //Retrieves the information for a specific director based on the provided ID.
  }
}
