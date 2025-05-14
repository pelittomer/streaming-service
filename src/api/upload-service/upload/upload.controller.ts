import { Controller, Get, Param, Res } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Get('img/:id')
  getImage(
    @Param('id', ParseObjectIdPipe) imageId: Types.ObjectId,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.uploadService.getImage(imageId, res)
  }

  @Get('mov/:id')
  getAndStreamVideo(
    @Param('id', ParseObjectIdPipe) fileId: Types.ObjectId,
    @Res() res: Response
  ) {
    this.uploadService.getAndStreamVideo(fileId,res)
  }

}
