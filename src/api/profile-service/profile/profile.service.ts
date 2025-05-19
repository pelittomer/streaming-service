import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Request } from 'express';
import { SharedUtilsService } from 'src/common/utils/shared-utils.service';
import { Types } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as ErrorMessages from "./constants/error-messages.constant"

@Injectable()
export class ProfileService {
  private readonly PROFILE_LIMIT = 5

  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly sharedUtilsService: SharedUtilsService
  ) { }

  private async verifyProfileOwnership(
    profileId: Types.ObjectId,
    userId: Types.ObjectId
  ): Promise<ProfileDocument> {
    const foundProfile = await this.profileRepository.findOne({ _id: profileId, user: userId })
    if (!foundProfile) {
      throw new NotFoundException(ErrorMessages.PROFILE_NOT_FOUND)
    }
    return foundProfile
  }

  private async checkProfileLimit(userId: Types.ObjectId): Promise<void> {
    const profileCount = await this.profileRepository.countDocument({ user: userId })
    if (profileCount === this.PROFILE_LIMIT) {
      throw new BadRequestException(ErrorMessages.PROFILE_LIMIT_REACHED)
    }
  }

  async addProfile(
    userInputs: CreateProfileDto,
    req: Request,
    uploadedImage: Express.Multer.File
  ): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    await this.checkProfileLimit(userId)
    await this.profileRepository.create({ ...userInputs, user: userId }, uploadedImage)
    return ErrorMessages.PROFILE_CREATED_SUCCESSFULLY
  }

  async getCurrentProfile(
    profileId: Types.ObjectId,
    req: Request
  ): Promise<ProfileDocument | null> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    return await this.profileRepository.findOne({ _id: profileId, user: userId })
  }

  async getUserProfile(req: Request): Promise<Profile[]> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    return await this.profileRepository.find({ user: userId })
  }

  async updateMyProfile(
    userInputs: UpdateProfileDto,
    req: Request,
    uploadedImage: Express.Multer.File,
    profileId: Types.ObjectId
  ): Promise<string> {
    const userId = this.sharedUtilsService.getUserIdFromRequest(req)
    const profileObjectId = new Types.ObjectId(profileId)

    const foundProfile = await this.verifyProfileOwnership(profileObjectId, userId)

    await this.profileRepository.findOneAndUpdate(
      { user: userId, _id: profileId },
      userInputs,
      uploadedImage,
      foundProfile.avatar
    )

    return ErrorMessages.PROFILE_UPDATED_SUCCESSFULLY
  }
}