import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subtitle, SubtitleDocument } from "./schemas/subtitle.schema";
import { Model } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class SubtitleRepository {
    constructor(
        @InjectModel(Subtitle.name) private subtitleModel: Model<Subtitle>,
        private readonly uploadService: UploadService,
    ) { }

    async create(
        userInputs: Partial<Pick<Subtitle, 'episode' | 'movie' | 'language'>>,
        uploadedFile: Express.Multer.File
    ): Promise<void> {
        const fileId = await this.uploadService.uploadToModelWithGridFS(uploadedFile)
        await this.subtitleModel.create({ ...userInputs, subtitlefile: fileId })
    }

    async find(
        queryFields: Partial<Pick<Subtitle, 'movie' | 'episode'>>
    ): Promise<Pick<SubtitleDocument, '_id' | 'language' | 'subtitlefile'>[]> {
        return await this.subtitleModel.find(queryFields).select('language subtitlefile').lean()
    }
}