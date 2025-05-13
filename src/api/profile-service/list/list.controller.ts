import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/types';
import { CreateListDto } from './dto/create-list.dto';
import { Request } from 'express';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PartialUpdateListDto } from './dto/update-list.dto';

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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Get(':id')
  getListById(
    @Param('id', ParseObjectIdPipe) listId: Types.ObjectId,
    @Req() req: Request
  ) {
    return this.listService.getListById(listId, req)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Get()
  getAllLists(
    @Req() req: Request
  ) {
    return this.listService.getAllLists(req)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Customer)
  @Put(':id')
  updateList(
    @Param('id', ParseObjectIdPipe) listId: Types.ObjectId,
    @Req() req: Request,
    @Body() userInputs: PartialUpdateListDto
  ) {
    return this.listService.updateList(listId, req, userInputs)
  }
}
