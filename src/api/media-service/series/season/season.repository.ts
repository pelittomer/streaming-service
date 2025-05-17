import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Season, SeasonDocument } from "./schemas/season.schema";
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
                posterId = await this.uploadService.createFile(uploadedFile, session)
            }
            await this.seasonModel.create([{ ...userInputs, poster: posterId }], { session })
        })
    }

    async find(queryFields: Partial<Season>): Promise<Pick<Season, 'sessionNumber'>[]> {
        return await this.seasonModel.find(queryFields).select('sessionNumber').lean()
    }

    async exists(queryFields: Partial<Season | Pick<SeasonDocument, '_id'>>): Promise<Pick<SeasonDocument, '_id'> | null> {
        return await this.seasonModel.exists(queryFields)
    }
}