import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { IProfileUtilsService, VerifyProfileOwnershipParams } from "./profile-utils.service.interface";
import { ProfileRepository } from "../repository/profile.repository";
import { PROFILE_MESSAGE } from "../constants/profile.message";
import { Types } from "mongoose";
import { ProfileDocument } from "../entities/types";

@Injectable()
export class ProfileUtilsService implements IProfileUtilsService {
    private readonly PROFILE_LIMIT = 5

    constructor(
        private readonly profileRepository: ProfileRepository,
    ) { }

    async verifyProfileOwnership({profileId,userId}:VerifyProfileOwnershipParams): Promise<ProfileDocument> {
        const foundProfile = await this.profileRepository.findOne({ _id: profileId, user: userId })
        if (!foundProfile) {
            throw new NotFoundException(PROFILE_MESSAGE.PROFILE_NOT_FOUND)
        }
        return foundProfile
    }

    async checkProfileLimit(userId: Types.ObjectId): Promise<void> {
        const profileCount = await this.profileRepository.countDocument({ user: userId })
        if (profileCount === this.PROFILE_LIMIT) {
            throw new BadRequestException(PROFILE_MESSAGE.PROFILE_LIMIT_REACHED)
        }
    }
}