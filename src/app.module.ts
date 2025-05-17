import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfig } from './config/type';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './api/user-service/user/user.module';
import { AuthModule } from './api/user-service/auth/auth.module';
import { ProfileModule } from './api/profile-service/profile/profile.module';
import { FavoriteModule } from './api/profile-service/favorite/favorite.module';
import { ListModule } from './api/profile-service/list/list.module';
import { MovieModule } from './api/media-service/movie/movie.module';
import { CategoryModule } from './api/media-service/category/category.module';
import { SubtitleModule } from './api/media-service/subtitle/subtitle.module';
import { AudioModule } from './api/media-service/audio/audio.module';
import { UploadModule } from './api/upload-service/upload/upload.module';
import { SeriesModule } from './api/media-service/series/series/series.module';
import { SeasonModule } from './api/media-service/series/season/season.module';
import { EpisodeModule } from './api/media-service/series/episode/episode.module';
import { PaymentModule } from './api/payment-service/payment/payment.module';
import { ReviewModule } from './api/review-service/review/review.module';
import { WatchedHistoryModule } from './api/profile-service/watched-history/watched-history.module';
import { ActorModule } from './api/media-service/actor/actor.module';
import { DirectorModule } from './api/media-service/director/director.module';
import { OnlineStatusGateway } from './common/gateways/online-status/online-status.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AppConfig>) => ({
        uri: configService.get('db.database_url', { infer: true })
      }),
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig>) => ({
        secret: configService.get('auth.secret_key', { infer: true })
      })
    }),
    UserModule,
    AuthModule,
    ProfileModule,
    FavoriteModule,
    ListModule,
    MovieModule,
    CategoryModule,
    SubtitleModule,
    AudioModule,
    UploadModule,
    SeriesModule,
    SeasonModule,
    EpisodeModule,
    PaymentModule,
    ReviewModule,
    WatchedHistoryModule,
    ActorModule,
    DirectorModule,
  ],
  providers: [AppService, OnlineStatusGateway],
})
export class AppModule { }
