import { Injectable, NotFoundException } from "@nestjs/common";
import { UploadRepository } from "../repository/upload.repository";
import { BuildFileMetadataParams, IUploadUtilsService, TFileMetadata } from "./upload-utils.service.interface";
import { Types } from "mongoose";
import { Upload } from "../entities/upload.entity";

@Injectable()
export class UploadUtilsService implements IUploadUtilsService {
    constructor(
        private readonly uploadRepository: UploadRepository,
    ) { }

    buildFileMetadata({ file, gridFsFileId }: BuildFileMetadataParams): TFileMetadata {
        return {
            name: file.originalname,
            mimeType: file.mimetype,
            ...(gridFsFileId ? { gridFsFileId } : { data: file.buffer }),
        }
    }

    async verifyFilePresence(fileId: Types.ObjectId): Promise<Upload> {
        const fileRecord = await this.uploadRepository.findById(fileId)
        if (!fileRecord) throw new NotFoundException('File not found.')
        return fileRecord
    }
}