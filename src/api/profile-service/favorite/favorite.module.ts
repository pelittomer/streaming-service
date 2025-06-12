import { forwardRef, Module } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './favorite.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './entities/favorite.entity';
import { SharedUtilsModule } from 'src/common/utils/shared-utils.module';
import { SeriesModule } from 'src/api/media-service/series/series/series.module';
import { MovieModule } from 'src/api/media-service/movie/movie.module';
import { ProfileModule } from '../profile/profile.module';
import { FavoriteUtilsService } from './utils/favorite-utils.service';
import { FavoriteRepository } from './repository/favorite.repository';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository,FavoriteUtilsService],
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }]),
    forwardRef(() => ProfileModule),
    SharedUtilsModule, SeriesModule, MovieModule
  ],
  exports: [FavoriteRepository]
})
export class FavoriteModule { }
