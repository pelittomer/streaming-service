import { Body, Controller, Get, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ActorService } from './actor.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UploadImage()
  @Post()
  addActor(
    @Body() userInputs: CreateActorDto,
    @UploadedFile() uploadedImage: Express.Multer.File
  ) {
    return this.actorService.addActor(userInputs,uploadedImage)
  }

  @Get()
  getAllActor() {
    //Retrieves a list of all available actor.
  }

  @Get(':id')
  getActorById() {
    //Retrieves the information for a specific actor based on the provided ID.
  }

}
