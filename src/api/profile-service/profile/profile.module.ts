import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './service/profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './repository/profile.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { UploadModule } from 'src/api/upload-service/upload/upload.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { ProfileUtilsService } from './utils/profile-utils.service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, ProfileUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    forwardRef(() => FavoriteModule),
    SharedUtilsModule, UploadModule,
  ],
  exports: [ProfileRepository]
})
export class ProfileModule { }
