import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "../entities/profile.entity";
import { Model } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { FavoriteRepository } from "../../favorite/repository/favorite.repository";
import { ProfileDocument } from "../entities/types";
import { CreateProfileOptions, ExistsProfileOptions, FindOneAndUpdateProfileOptions, FindOneProfileOptions, IProfileRepository, TExistsProfile } from "./profile.repository.interface";

@Injectable()
export class ProfileRepository implements IProfileRepository {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly uploadService: UploadService,
    ) { }

    async countDocument(queryFields: Partial<Profile>): Promise<number> {
        return await this.profileModel.countDocuments(queryFields)
    }

    async create({ queryFields, uploadedImage }: CreateProfileOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createFile(uploadedImage, session)
            const [newProfile] = await this.profileModel.create([{
                ...queryFields,
                avatar: imageId
            }], { session })
            await this.favoriteRepository.create({ payload: { profile: newProfile._id }, session })
        })
    }

    async findOne(queryFields: FindOneProfileOptions): Promise<ProfileDocument | null> {
        return await this.profileModel.findOne(queryFields)
    }

    async find(queryFields: Partial<Profile>): Promise<Profile[]> {
        return await this.profileModel.find(queryFields).lean()
    }

    async findOneAndUpdate({ payload, queryFields, uploadedImage, avatar }: FindOneAndUpdateProfileOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const updateData: Partial<Profile> = { ...payload }

            if (uploadedImage) {
                if (avatar) {
                    await this.uploadService.updateExistingFile(uploadedImage, avatar)
                } else {
                    const newImageId = await this.uploadService.createFile(uploadedImage, session)
                    updateData.avatar = newImageId
                }
            }

            await this.profileModel.findOneAndUpdate(queryFields, updateData, { session })
        })
    }

    async exists(queryFields: ExistsProfileOptions): Promise<TExistsProfile> {
        return await this.profileModel.exists(queryFields)
    }
}