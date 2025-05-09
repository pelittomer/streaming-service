import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Upload, UploadDocument } from "./schemas/upload.schema";
import { ClientSession, Model, Types } from "mongoose";

@Injectable()
export class UploadRepository {
    constructor(
        @InjectModel(Upload.name) private uploadModel: Model<Upload>
    ) { }

    async create(userInputs: Partial<Upload>, session: ClientSession): Promise<UploadDocument> {
        const [newData] = await this.uploadModel.create([userInputs], { session })
        return newData
    }

    async findOneAndUpdate(imageId: Types.ObjectId, uploadedImage: Express.Multer.File, session: ClientSession): Promise<void> {
        await this.uploadModel.findOneAndUpdate({ _id: imageId }, { data: uploadedImage.buffer }, { session })
    }
}