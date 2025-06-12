import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Movie } from "src/api/media-service/movie/entities/movie.entity";
import { Episode } from "src/api/media-service/series/episode/entities/episode.entity";
import { Profile } from "../../profile/entities/profile.entity";

@Schema({ timestamps: true })
export class WatchedHistory {
    @Prop({ type: Number, default: 0 })
    watchDuration: number;

    @Prop({ type: Types.ObjectId, ref: Movie.name })
    movie?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Episode.name })
    episode?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
    profile: Types.ObjectId;
}

export const WatchedHistorySchema = SchemaFactory.createForClass(WatchedHistory)