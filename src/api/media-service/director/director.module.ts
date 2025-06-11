import { Module } from '@nestjs/common';
import { DirectorController } from './director.controller';
import { DirectorRepository } from './repository/director.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from './entities/director.entity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { DirectorService } from './service/director.service';
import { DirectorUtilsService } from './utils/director-utils.service';

@Module({
  controllers: [DirectorController],
  providers: [DirectorService, DirectorRepository,DirectorUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Director.name, schema: DirectorSchema }]),
    SharedUtilsModule, UploadModule
  ]
})
export class DirectorModule { }
