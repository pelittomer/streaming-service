import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repository/profile.repository';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { Profile } from '../entities/profile.entity';
import { AddProfileParams, GetCurrentProfileParams, IProfileService, UpdateMyProfileParams } from './profile.service.interface';
import { ProfileDocument } from '../entities/types';
import { ProfileUtilsService } from '../utils/profile-utils.service';
import { PROFILE_MESSAGE } from '../constants/profile.message';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly sharedUtilsService: SharedUtilsService,
    private readonly profileUtilsService: ProfileUtilsService,
  ) { }

  async addProfile({ payload, req, uploadedImage }: AddProfileParams): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    await this.profileUtilsService.checkProfileLimit(userId)
    await this.profileRepository.create({ queryFields: { ...payload, user: userId }, uploadedImage })
    return PROFILE_MESSAGE.PROFILE_CREATED_SUCCESSFULLY
  }

  async getCurrentProfile({ profileId, req }: GetCurrentProfileParams): Promise<ProfileDocument | null> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    return await this.profileRepository.findOne({ _id: profileId, user: userId })
  }

  async getUserProfile(req: Request): Promise<Profile[]> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    return await this.profileRepository.find({ user: userId })
  }

  async updateMyProfile({ payload, profileId, req, uploadedImage }: UpdateMyProfileParams): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(profileId)

    const foundProfile = await this.profileUtilsService.verifyProfileOwnership({ profileId: profileObjectId, userId })

    await this.profileRepository.findOneAndUpdate({
      queryFields: { user: userId, _id: profileId },
      payload,
      uploadedImage,
      avatar: foundProfile.avatar
    })

    return PROFILE_MESSAGE.PROFILE_UPDATED_SUCCESSFULLY
  }
}