import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";
import { Movie } from "../../movie/entities/movie.entity";
import { Episode } from "../../series/episode/schemas/episode.schema";

export type SubtitleDocument = Subtitle & Document

@Schema({ timestamps: true })
export class Subtitle {
    @Prop({ type: String, required: true })
    language: string;

    @Prop({ type: Boolean, default: false })
    isDefault: boolean;

    @Prop({ type: Types.ObjectId, ref: Upload.name, required: true })
    subtitlefile: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: Movie.name })
    movie?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Episode.name })
    episode?: Types.ObjectId;
}

export const SubtitleSchema = SchemaFactory.createForClass(Subtitle)