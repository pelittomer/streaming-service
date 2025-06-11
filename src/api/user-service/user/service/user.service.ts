import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { UserRepository } from '../repository/user.repository';
import { UserWithoutSensitiveInfo } from '../repository/user.repository.interface';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async getCurrentUser(req: Request): Promise<UserWithoutSensitiveInfo> {
    const user = this.sharedUtilsService.getUserInfo(req)
    return this.userRepository.findCurrentUser(user.userId)
  }
}
