import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "src/api/media-service/movie/entities/movie.entity";
import { Episode } from "src/api/media-service/series/episode/schemas/episode.schema";
import { User } from "src/api/user-service/user/entities/user.entity";

export type ReviewDocument = Review & Document

@Schema({ timestamps: true })
export class Review {
    @Prop({ type: String, required: true })
    comment: string;

    @Prop({ type: Boolean, default: false })
    blur: boolean;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Movie.name })
    movie?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Episode.name })
    episode?: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
