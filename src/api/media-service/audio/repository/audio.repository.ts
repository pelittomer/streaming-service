import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Audio } from "../entities/audio.entity";
import { Model } from "mongoose";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { CreateAudioOptions, FindAudioOptions, IAudioRepository, TFindAudio } from "./audio.repository.interface";

@Injectable()
export class AudioRepository implements IAudioRepository {
    constructor(
        @InjectModel(Audio.name) private audioModel: Model<Audio>,
        private readonly uploadService: UploadService,
    ) { }

    async create({ payload, uploadedFile }: CreateAudioOptions): Promise<void> {
        const fileId = await this.uploadService.uploadToModelWithGridFS(uploadedFile)
        await this.audioModel.create({ ...payload, audioFile: fileId })
    }

    async find(queryFields: FindAudioOptions): Promise<TFindAudio> {
        return await this.audioModel.find(queryFields)
            .select('language audioFile')
            .lean()
    }
}