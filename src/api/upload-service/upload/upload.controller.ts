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
  getAndStreamVideo() {
    /*
        Serves a video stream from the database corresponding to the specified video ID. This endpoint is designed for streaming video content to the user.
    */
  }

}
