import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { CreateSeasonOptions, ExistsSeasonOptions, ISeasonRepository, TExistsSeason, TFindSeason } from "./season.repository.interface";
import { Season } from "../entities/season.enity";

@Injectable()
export class SeasonRepository implements ISeasonRepository {
    constructor(
        @InjectModel(Season.name) private seasonModel: Model<Season>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create({ payload, uploadedFile }: CreateSeasonOptions): Promise<void> {
        let posterId: Types.ObjectId | undefined
        await this.sharedUtilsService.executeTransaction(async (session) => {
            if (uploadedFile) {
                posterId = await this.uploadService.createFile(uploadedFile, session)
            }
            await this.seasonModel.create([{ ...payload, poster: posterId }], { session })
        })
    }

    async find(queryFields: Partial<Season>): Promise<TFindSeason> {
        return await this.seasonModel.find(queryFields)
            .select('sessionNumber')
            .lean()
    }

    async exists(queryFields: Partial<ExistsSeasonOptions>): Promise<TExistsSeason> {
        return await this.seasonModel.exists(queryFields)
    }
}