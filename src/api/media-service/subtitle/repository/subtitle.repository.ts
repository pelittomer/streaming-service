import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subtitle } from "../schemas/subtitle.schema";
import { Model } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/service/upload.service";
import { CreateSubtitleOptions, FindSubtitleOptions, ISubtitleRepository, TFindSubtitle } from "./subtitle.repository.interface";

@Injectable()
export class SubtitleRepository implements ISubtitleRepository {
    constructor(
        @InjectModel(Subtitle.name) private subtitleModel: Model<Subtitle>,
        private readonly uploadService: UploadService,
    ) { }

    async create({ payload, uploadedFile }: CreateSubtitleOptions): Promise<void> {
        const fileId = await this.uploadService.uploadToModelWithGridFS(uploadedFile)
        await this.subtitleModel.create({ ...payload, subtitlefile: fileId })
    }

    async find(queryFields: FindSubtitleOptions): Promise<TFindSubtitle> {
        return await this.subtitleModel.find(queryFields)
            .select('language subtitlefile')
            .lean()
    }
}