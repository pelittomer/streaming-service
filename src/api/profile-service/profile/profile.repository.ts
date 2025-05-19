import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { FavoriteRepository } from "../favorite/favorite.repository";

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly uploadService: UploadService,
    ) { }

    async countDocument(queryFields: Partial<Profile>): Promise<number> {
        return await this.profileModel.countDocuments(queryFields)
    }

    async create(
        queryFields: Partial<Profile>,
         uploadedImage: Express.Multer.File
        ): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createFile(uploadedImage, session)
            const [newProfile] = await this.profileModel.create([{
                ...queryFields,
                avatar: imageId
            }], { session })
            await this.favoriteRepository.create({ profile: newProfile._id }, session)
        })
    }

    async findOne(
        queryFields: Partial<Profile | Pick<ProfileDocument, '_id'>>
    ): Promise<ProfileDocument | null> {
        return await this.profileModel.findOne(queryFields)
    }

    async find(queryFields: Partial<Profile>): Promise<Profile[]> {
        return await this.profileModel.find(queryFields).lean()
    }

    async findOneAndUpdate(
        queryFields: Partial<Profile | Pick<ProfileDocument, '_id'>>,
        userInputs: UpdateProfileDto,
        uploadedImage: Express.Multer.File,
        avatar?: Types.ObjectId,
    ): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const updateData: Partial<Profile> = { ...userInputs }

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

    async exists(
        queryFields: Partial<Profile | Pick<ProfileDocument, '_id'>>
    ): Promise<Pick<ProfileDocument, '_id'> | null> {
        return await this.profileModel.exists(queryFields)
    }
}