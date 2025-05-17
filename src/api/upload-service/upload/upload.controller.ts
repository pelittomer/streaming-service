import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Get('file/:id')
  getFile(
    @Param('id', ParseObjectIdPipe) fileId: Types.ObjectId,
    @Res() res: Response
  ) {
    return this.uploadService.getFile(fileId, res)
  }

  @UseGuards(AuthGuard)
  @Get('mov/:id')
  getAndStreamVideo(
    @Param('id', ParseObjectIdPipe) fileId: Types.ObjectId,
    @Res() res: Response
  ) {
    this.uploadService.getAndStreamVideo(fileId, res)
  }
}
