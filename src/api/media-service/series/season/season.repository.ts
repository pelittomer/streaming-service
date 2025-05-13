import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Season } from "./schemas/season.schema";
import { Model, Types } from "mongoose";
import { CreateSeasonDto } from "./dto/create-season.dto";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class SeasonRepository {
    constructor(
        @InjectModel(Season.name) private seasonModel: Model<Season>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create(userInputs: CreateSeasonDto, uploadedFile: Express.Multer.File): Promise<void> {
        let posterId: Types.ObjectId | undefined
        await this.sharedUtilsService.executeTransaction(async (session) => {
            if (uploadedFile) {
                posterId = await this.uploadService.createImage(uploadedFile, session)
            }
            await this.seasonModel.create([{ ...userInputs, poster: posterId }], { session })
        })
    }
}