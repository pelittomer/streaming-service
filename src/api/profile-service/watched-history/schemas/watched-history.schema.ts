import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "src/api/media-service/movie/schemas/movie.schema";
import { Episode } from "src/api/media-service/series/episode/schemas/episode.schema";
import { Profile } from "../../profile/schemas/profile.schema";

export type WatchedHistoryDocument = WatchedHistory & Document

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