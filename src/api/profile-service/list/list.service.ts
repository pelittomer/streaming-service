import { Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create-list.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { List } from './schemas/list.schema';

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
}
