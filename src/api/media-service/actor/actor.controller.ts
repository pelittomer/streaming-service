import { Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @Post()
  addActor() {
    //Adds a new actor to the database.
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
