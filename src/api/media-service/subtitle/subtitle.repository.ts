import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subtitle } from "./schemas/subtitle.schema";
import { Model } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class SubtitleRepository {
    constructor(
        @InjectModel(Subtitle.name) private subtitleModel: Model<Subtitle>,
        private readonly uploadService: UploadService,
    ) { }

    async create(userInputs: Partial<Pick<Subtitle, 'episode' | 'movie' | 'language'>>, uploadedFile: Express.Multer.File): Promise<void> {
        const fileId = await this.uploadService.uploadToModelWithGridFS(uploadedFile)
        await this.subtitleModel.create({ ...userInputs, subtitlefile: fileId })
    }

}