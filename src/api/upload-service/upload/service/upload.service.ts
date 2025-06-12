import { Injectable } from '@nestjs/common';
import { Connection, Types } from 'mongoose';
import { Response } from 'express';
import { Db, GridFSBucket } from 'mongodb';
import { InjectConnection } from '@nestjs/mongoose';
import { UploadProducerService } from 'src/common/queues/upload/upload-producer.service';
import { UploadRepository } from '../repository/upload.repository';
import { UploadUtilsService } from '../utils/upload-utils.service';
import { CreateFileParams, GetAndStreamVideoParams, IUploadService, UpdateExistingFileParams } from './upload.service.interface';

@Injectable()
export class UploadService implements IUploadService {
  private gridFSBucket: GridFSBucket;

  constructor(
    private readonly uploadRepository: UploadRepository,
    private readonly uploadProducerService: UploadProducerService,
    private readonly uploadUtilsService: UploadUtilsService,
    @InjectConnection() private connection: Connection,
  ) {
    this.gridFSBucket = new GridFSBucket(this.connection.db as Db, {
      bucketName: 'uploads',
    })
  }

  async getFile(fileId: Types.ObjectId, res: Response) {
    const fileRecord = await this.uploadUtilsService.verifyFilePresence(fileId)
    res.set('Content-Type', fileRecord.mimeType)
    res.send(fileRecord.data)
  }

  async createFile({ session, uploadedFile }: CreateFileParams): Promise<Types.ObjectId> {
    const payload = this.uploadUtilsService.buildFileMetadata({ file: uploadedFile })
    const newData = await this.uploadRepository.create({ payload, session })
    await this.uploadProducerService.uploadFile({ fileId: newData._id as Types.ObjectId, uploadedFile })
    return newData._id as Types.ObjectId
  }

  async updateExistingFile({ fileId, uploadedFile }: UpdateExistingFileParams): Promise<void> {
    await this.uploadProducerService.uploadFile({ fileId: fileId as Types.ObjectId, uploadedFile })
  }

  async uploadToModelWithGridFS(uploadedFile: Express.Multer.File): Promise<Types.ObjectId> {
    const gridFsFileId = await this.uploadRepository.uploadLargeFile(uploadedFile)
    const payload = this.uploadUtilsService.buildFileMetadata({ file: uploadedFile, gridFsFileId })
    const newData = await this.uploadRepository.create({ payload })
    return newData._id as Types.ObjectId
  }

  async getAndStreamVideo({ fileId, res }: GetAndStreamVideoParams) {
    const fileRecord = await this.uploadUtilsService.verifyFilePresence(fileId)
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
