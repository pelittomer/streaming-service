import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sharedUtilsService: SharedUtilsService,
  ) { }

  async getCurrentUser(req: Request): Promise<Omit<UserDocument, 'emailVerificationToken'|'password'>> {
    const user = this.sharedUtilsService.getUserInfo(req)
    return this.userRepository.findCurrentUser(user.userId)
  }

}
