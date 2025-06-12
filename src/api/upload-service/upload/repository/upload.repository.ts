import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Model, Types } from "mongoose";
import { Db, GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { Readable } from 'stream';
import { Upload } from "../entities/upload.entity";
import { UploadDocument } from "../entities/types";
import { CreateUploadOptions, FindOneAndUpdateUploadOptions, IUploadRepository } from "./upload.repository.interface";

@Injectable()
export class UploadRepository implements IUploadRepository {
    private gridFSBucket: GridFSBucket;
    constructor(
        @InjectModel(Upload.name) private uploadModel: Model<Upload>,
        @InjectConnection() private connection: Connection,
    ) {
        this.gridFSBucket = new GridFSBucket(this.connection.db as Db, {
            bucketName: 'uploads',
        })
    }

    async findById(fileId: Types.ObjectId): Promise<Upload | null> {
        return await this.uploadModel.findById(fileId)
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

    async create({ payload, session }: CreateUploadOptions): Promise<UploadDocument> {
        const [newData] = await this.uploadModel.create([payload], { session })
        return newData
    }

    async findOneAndUpdate({ data, fileId }: FindOneAndUpdateUploadOptions): Promise<void> {
        await this.uploadModel.findOneAndUpdate({ _id: fileId }, data)
    }
}