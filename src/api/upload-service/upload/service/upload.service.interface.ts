import { Response } from "express";
import { ClientSession, Types } from "mongoose";

export interface CreateFileParams {
    uploadedFile: Express.Multer.File;
    session: ClientSession;
}
export interface UpdateExistingFileParams {
    uploadedFile: Express.Multer.File;
    fileId: Types.ObjectId;
}
export interface GetAndStreamVideoParams {
    fileId: Types.ObjectId;
    res: Response;
}
export interface IUploadService {
    getFile(fileId: Types.ObjectId, res: Response);
    createFile(params: CreateFileParams): Promise<Types.ObjectId>;
    updateExistingFile(params: UpdateExistingFileParams): Promise<void>;
    uploadToModelWithGridFS(uploadedFile: Express.Multer.File): Promise<Types.ObjectId>;
    getAndStreamVideo(params: GetAndStreamVideoParams);
}