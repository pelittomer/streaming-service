import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Director, DirectorDocument } from "./schemas/director.schema";
import { Model, Types } from "mongoose";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class DirectorRepository {
    constructor(
        @InjectModel(Director.name) private directorModel: Model<Director>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create(userInputs: CreateDirectorDto, uploadedImage: Express.Multer.File): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createImage(uploadedImage, session)
            await this.directorModel.create([{
                ...userInputs,
                profilePicture: imageId
            }], { session })
        })
    }

    async find(): Promise<Pick<DirectorDocument, '_id' | 'fullName' | 'profilePicture'>[]> {
        return await this.directorModel.find().select('fullName').lean()
    }

    async findById(directorId: Types.ObjectId): Promise<Director | null> {
        return await this.directorModel.findById(directorId).lean()
    }
}