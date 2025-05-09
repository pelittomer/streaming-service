import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Upload, UploadDocument } from "./schemas/upload.schema";
import { ClientSession, Model } from "mongoose";

@Injectable()
export class UploadRepository {
    constructor(
        @InjectModel(Upload.name) private uploadModel: Model<Upload>
    ) { }

    async create(userInputs: Partial<Upload>, session: ClientSession): Promise<UploadDocument> {
        const [newData] = await this.uploadModel.create([userInputs], { session })
        return newData
    }
}