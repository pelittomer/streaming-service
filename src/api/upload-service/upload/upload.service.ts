import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { ClientSession, Connection, Types } from 'mongoose';
import { Response } from 'express';
import { Db, GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { UploadProducerService } from 'src/common/queues/upload/upload-producer.service';

@Injectable()
export class UploadService {
  private gridFSBucket: GridFSBucket;
  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly uploadProducerService: UploadProducerService,
    @InjectConnection() private connection: Connection,
  ) {
    this.gridFSBucket = new GridFSBucket(this.connection.db as Db, {
      bucketName: 'uploads',
    })
  }

  private buildFileMetadata(file: Express.Multer.File, gridFsFileId?: string) {
    return {
      name: file.originalname,
      mimeType: file.mimetype,
      ...(gridFsFileId ? { gridFsFileId } : { data: file.buffer }),
    }
  }

  private async verifyFilePresence(fileId: Types.ObjectId) {
    const fileRecord = await this.uploadRepository.findById(fileId)
    if (!fileRecord) throw new NotFoundException('File not found.')
    return fileRecord
  }

  async getFile(fileId: Types.ObjectId, res: Response) {
    const fileRecord = await this.verifyFilePresence(fileId)
    res.set('Content-Type', fileRecord.mimeType)
    res.send(fileRecord.data)
  }

  async createFile(uploadedFile: Express.Multer.File, session: ClientSession): Promise<Types.ObjectId> {
    const payload = this.buildFileMetadata(uploadedFile)
    const newData = await this.uploadRepository.create(payload, session)
    await this.uploadProducerService.uploadFile({ fileId: newData._id as Types.ObjectId, uploadedFile })
    return newData._id as Types.ObjectId
  }

  async updateExistingFile(uploadedFile: Express.Multer.File, imageId: Types.ObjectId): Promise<void> {
    await this.uploadProducerService.uploadFile({ fileId: imageId as Types.ObjectId, uploadedFile })
  }

  async uploadToModelWithGridFS(uploadedFile: Express.Multer.File) {
    const gridFsFileId = await this.uploadRepository.uploadLargeFile(uploadedFile)
    const payload = this.buildFileMetadata(uploadedFile, gridFsFileId)
    const newData = await this.uploadRepository.create(payload)
    return newData._id as Types.ObjectId
  }

  async getAndStreamVideo(fileId: Types.ObjectId, res: Response) {
    const fileRecord = await this.verifyFilePresence(fileId)
    const objectId = new Types.ObjectId(fileRecord.gridFsFileId)

    const downloadStream = this.gridFSBucket.openDownloadStream(objectId)

    res.setHeader('Content-Type', fileRecord.mimeType)
    downloadStream.pipe(res)

    return new Promise((resolve, reject) => {
      downloadStream.on('end', resolve)
      downloadStream.on('error', reject)
    })
  }
}
