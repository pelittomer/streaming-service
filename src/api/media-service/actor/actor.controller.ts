import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ActorService } from './actor.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { UploadImage } from 'src/common/decorators/upload-image.decorator';
import { CreateActorDto } from './dto/create-actor.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
    return this.actorService.addActor(userInputs, uploadedImage)
  }

  @Get()
  getAllActor() {
    return this.actorService.getAllActor()
  }

  @Get(':id')
  getActorById(
    @Param('id', ParseObjectIdPipe) actorId: Types.ObjectId
  ) {
    return this.actorService.getActorById(actorId)
  }

}
