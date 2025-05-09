import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    SharedUtilsModule, UploadModule
  ],
  exports: [ProfileRepository]
})
export class ProfileModule { }
