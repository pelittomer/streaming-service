import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './schemas/profile.schema';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository],
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])
  ],
  exports: [ProfileRepository]
})
export class ProfileModule { }
