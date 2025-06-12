import { Module } from '@nestjs/common';
import { UploadService } from './service/upload.service';
import { UploadController } from './upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './entities/upload.entity';
import { UploadQueueModule } from 'src/common/queues/upload/upload-queue.module';
import { UploadRepository } from './repository/upload.repository';
import { UploadUtilsService } from './utils/upload-utils.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, UploadUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    UploadQueueModule
  ],
  exports: [UploadRepository, UploadService]
})
export class UploadModule { }
