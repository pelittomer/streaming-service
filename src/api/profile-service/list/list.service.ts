import { BadRequestException, Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create-list.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { List } from './schemas/list.schema';
import { PartialUpdateListDto } from './dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async addNewList(userInputs: CreateListDto, req: Request): Promise<string> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    await this.listRepository.create({ ...userInputs, profile: userId })

    return `${userInputs.name} created.`
  }

  async getListById(listId: Types.ObjectId, req): Promise<List | null> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    return await this.listRepository.findOne({ _id: listId, profile: userId })
  }

  async getAllLists(req: Request): Promise<List[]> {
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    return await this.listRepository.find({ profile: userId })
  }

  async updateList(listId: Types.ObjectId, req: Request, userInputs: PartialUpdateListDto): Promise<string> {
    const { movie, series } = userInputs
    const user = this.sharedUtilsService.getUserInfo(req)
    const userId = new Types.ObjectId(user.userId)

    const listExists = await this.listRepository.exists({ profile: userId, _id: listId })
    if (!listExists) {
      throw new BadRequestException('List not found!')
    }

    const updateQuery: any = {};

    if (movie) {
      updateQuery.$addToSet = { movie: movie };
    }

    if (series) {
      updateQuery.$addToSet = { series: series };
    }

    await this.listRepository.findOneAndUpdate({ _id: listId, profile: userId }, updateQuery)

    return `${movie ? "Movie" : "Series"} add list.`
  }
}
