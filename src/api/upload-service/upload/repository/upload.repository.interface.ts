import { ClientSession, Types } from "mongoose";
import { Upload } from "../entities/upload.entity";
import { UploadDocument } from "../entities/types";

export interface CreateUploadOptions {
    payload: Partial<Upload>;
    session?: ClientSession;
}
export interface FindOneAndUpdateUploadOptions {
    fileId: Types.ObjectId;
    data: { data: Buffer };
}
export interface IUploadRepository {
    findById(fileId: Types.ObjectId): Promise<Upload | null>;
    uploadLargeFile(uploadedFile: Express.Multer.File): Promise<string>;
    create(params: CreateUploadOptions): Promise<UploadDocument>;
    findOneAndUpdate(params: FindOneAndUpdateUploadOptions): Promise<void>;
}