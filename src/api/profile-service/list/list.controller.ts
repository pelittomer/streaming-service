import { Controller, Get, Post, Put } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }

  @Post()
  addNewList() {
    /* 
      Allows the authenticated user to create a new list.
    */
  }

  @Get('id')
  getListById() {
    /*
       This endpoint fetches and returns the list from the database that matches the given 'id' path parameter.
    */
  }

  @Get()
  getLists() {
    /*
       Retrieves all lists belonging to the currently authenticated user.
    */
  }

  @Put('id')
  updateList() {
    /*
       Updates the information of a specific list identified by the provided ID.
    */
  }
}
