import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Upload, UploadDocument } from "./schemas/upload.schema";
import { ClientSession, Connection, Model, Types } from "mongoose";
import { Db, GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Readable } from 'stream';

@Injectable()
export class UploadRepository {
    private gridFSBucket: GridFSBucket;
    constructor(
        @InjectModel(Upload.name) private uploadModel: Model<Upload>,
        @InjectConnection() private connection: Connection,
    ) {
        this.gridFSBucket = new GridFSBucket(this.connection.db as Db, {
            bucketName: 'uploads',
        })
    }

    async findById(imageId: Types.ObjectId): Promise<Upload | null> {
        return await this.uploadModel.findById(imageId)
    }

    async uploadLargeFile(uploadedFile: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            const uploadStream = this.gridFSBucket.openUploadStream(uploadedFile.originalname, {
                contentType: uploadedFile.mimetype,
            })
            const bufferStream = Readable.from(uploadedFile.buffer)
            bufferStream.pipe(uploadStream)
                .on('finish', () => {
                    resolve(uploadStream.id.toHexString())
                })
                .on('error', (error) => {
                    reject(error);
                })
        })
    }

    async create(userInputs: Partial<Upload>, session?: ClientSession): Promise<UploadDocument> {
        const [newData] = await this.uploadModel.create([userInputs], { session })
        return newData
    }

    async findOneAndUpdate(imageId: Types.ObjectId, uploadedImage: Express.Multer.File, session: ClientSession): Promise<void> {
        await this.uploadModel.findOneAndUpdate({ _id: imageId }, { data: uploadedImage.buffer }, { session })
    }
}