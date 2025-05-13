import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Series, SeriesDocument } from "./schemas/series.schema";
import { Model } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class SeriesRepository {
    constructor(
        @InjectModel(Series.name) private seriesModel: Model<Series>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async exists(queryFields: Partial<Series>): Promise<Pick<SeriesDocument, '_id'> | null> {
        return await this.seriesModel.exists(queryFields)
    }

    async create(userInputs: Partial<Series>, uploadedFile: Express.Multer.File): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const poster = await this.uploadService.createImage(uploadedFile, session)
            await this.seriesModel.create([{ ...userInputs, poster }], { session })
        })
    }

    async find(limit: number, startIndex: number, filter: any, sortCriteria: any): Promise<Pick<SeriesDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[]> {
        return this.seriesModel.find(filter)
            .sort(sortCriteria)
            .skip(startIndex)
            .limit(limit)
            .select('title synopsis rate poster')
            .lean()
    }
}