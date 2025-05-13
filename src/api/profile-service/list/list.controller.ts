import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { CreateListDto } from './dto/create-list.dto';
import { Request } from 'express';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) { }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Post()
  addNewList(
    @Body() userInputs: CreateListDto,
    @Req() req: Request
  ) {
    return this.listService.addNewList(userInputs, req)
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
