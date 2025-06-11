import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Director } from "../entities/director.entity";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { IDirectorRepository, TFindDirector } from "./director.repository.interface";
import { CreateActorOptions } from "../../actor/repository/actor.repository.interface";

@Injectable()
export class DirectorRepository implements IDirectorRepository {
    constructor(
        @InjectModel(Director.name) private directorModel: Model<Director>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create({ payload, uploadedImage }: CreateActorOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createFile(uploadedImage, session)
            await this.directorModel.create([{
                ...payload,
                profilePicture: imageId
            }], { session })
        })
    }

    async find(): Promise<TFindDirector> {
        return await this.directorModel.find().select('fullName').lean()
    }

    async findById(directorId: Types.ObjectId): Promise<Director | null> {
        return await this.directorModel.findById(directorId).lean()
    }
}