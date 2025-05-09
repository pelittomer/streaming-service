import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "./schemas/profile.schema";
import { Model } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async countDocument(queryFields: Partial<Profile>): Promise<number> {
        return await this.profileModel.countDocuments(queryFields)
    }

    async create(queryFields: Partial<Profile>, uploadedImage: Express.Multer.File): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createImage(uploadedImage, session)
            await this.profileModel.create([{
                ...queryFields,
                avatar: imageId
            }], { session })
        })
    }
}