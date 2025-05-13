import { Injectable } from '@nestjs/common';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create-list.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';

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
}
