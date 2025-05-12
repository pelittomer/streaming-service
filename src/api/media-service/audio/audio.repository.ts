import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Audio, AudioDocument } from "./schemas/audio.schema";
import { Model } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class AudioRepository {
    constructor(
        @InjectModel(Audio.name) private audioModel: Model<Audio>,
        private readonly uploadService: UploadService,
    ) { }

    async create(userInputs: Partial<Pick<Audio, 'episode' | 'movie' | 'language'>>, uploadedFile: Express.Multer.File): Promise<void> {
        const fileId = await this.uploadService.uploadToModelWithGridFS(uploadedFile)
        await this.audioModel.create({ ...userInputs, audioFile: fileId })
    }

    async find(queryFields: Partial<Pick<Audio, 'movie' | 'episode'>>): Promise<Pick<AudioDocument, '_id' | 'language' | 'audioFile'>[]> {
        return await this.audioModel.find(queryFields).select('language audioFile').lean()
    }
}