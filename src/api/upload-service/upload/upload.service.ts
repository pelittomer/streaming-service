import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { ClientSession, Types } from 'mongoose';
import { Response } from 'express';

@Injectable()
export class UploadService {
  constructor(
    private readonly uploadRepository: UploadRepository,
  ) { }

  async getImage(imageId: Types.ObjectId, res: Response) {
    const imageRecord = await this.uploadRepository.findById(imageId)
    if (!imageRecord) throw new NotFoundException('Image not found.')

    res.set('Content-Type', imageRecord.mimeType)
    res.send(imageRecord.data)
  }

  async createImage(uploadedImage: Express.Multer.File, session: ClientSession): Promise<Types.ObjectId> {
    const payload = {
      name: uploadedImage.originalname,
      mimeType: uploadedImage.mimetype,
      data: uploadedImage.buffer
    }
    const newData = await this.uploadRepository.create(payload, session)
    return newData._id as Types.ObjectId
  }

  async updateExistingImage(uploadedImage: Express.Multer.File, imageId: Types.ObjectId, session: ClientSession): Promise<void> {
    await this.uploadRepository.findOneAndUpdate(imageId, uploadedImage, session)
  }

  async uploadToModelWithGridFS(uploadedFile: Express.Multer.File) {
    const gridFsFileId = await this.uploadRepository.uploadLargeFile(uploadedFile)
    const payload = {
      name: uploadedFile.originalname,
      mimeType: uploadedFile.mimetype,
      gridFsFileId
    }
    const newData = await this.uploadRepository.create(payload)
    return newData._id as Types.ObjectId
  }

}
