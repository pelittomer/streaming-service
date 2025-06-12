import { Types } from "mongoose";
import { Upload } from "../entities/upload.entity";

export interface TFileMetadata {
    name: string;
    mimeType: string;
    data?: Buffer;
    gridFsFileId?: string;
}
export interface BuildFileMetadataParams {
    file: Express.Multer.File;
    gridFsFileId?: string;
}
export interface IUploadUtilsService {
    buildFileMetadata(params: BuildFileMetadataParams): TFileMetadata;
    verifyFilePresence(fileId: Types.ObjectId): Promise<Upload>;
}