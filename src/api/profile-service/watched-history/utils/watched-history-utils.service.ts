import { BadRequestException, Injectable } from "@nestjs/common";
import { ProfileRepository } from "../../profile/repository/profile.repository";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { WATCHED_HISTORY_MESSAGE } from "../constants/watched-history.message";
import { Types } from "mongoose";
import { GetProfileObjectIdAndValidateParams, ValidateProfileOwnershipParams } from "./watched-history-utils.service.interface";

@Injectable()
export class WatchedHistoryUtilsService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly sharedUtilsService: SharedUtilsService,
    ) { }

    async validateProfileOwnership({ profileId, userId }: ValidateProfileOwnershipParams): Promise<void> {
        const matchUser = await this.profileRepository.exists({ _id: profileId, user: userId })
        if (!matchUser) {
            throw new BadRequestException(WATCHED_HISTORY_MESSAGE.HISTORY_NOT_MATCH_ACCOUNT)
        }
    }

    async getProfileObjectIdAndValidate({ profileIdFromQuery, req }: GetProfileObjectIdAndValidateParams): Promise<Types.ObjectId> {
        const userId = this.sharedUtilsService.getUserIdFromRequest(req)
        const profileObjectId = new Types.ObjectId(profileIdFromQuery.profile)

        await this.validateProfileOwnership({ profileId: profileObjectId, userId })
        return profileObjectId
    }

}