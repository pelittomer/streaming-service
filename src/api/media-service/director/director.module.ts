import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { DirectorRepository } from './director.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './schemas/director.schema';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, DirectorRepository],
  imports: [
    MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }]),
    SharedUtilsModule, UploadModule
  ]
})
export class DirectorModule { }
