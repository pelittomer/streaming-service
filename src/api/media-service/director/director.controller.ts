import { Body, Controller, Get, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { DirectorService } from './director.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateDirectorDto } from './dto/create-director.dto';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UploadImage()
  @Post()
  addDirector(
    @Body() userInputs: CreateDirectorDto,
    @UploadedFile() uploadedImage: Express.Multer.File
  ) {
    return this.directorService.addDirector(userInputs, uploadedImage)
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
