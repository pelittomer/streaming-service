import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";
import { Movie } from "../../movie/schemas/movie.schema";
import { Episode } from "../../series/episode/schemas/episode.schema";

export type AudioDocument = Audio & Document

@Schema()
export class Audio {
    @Prop({ type: String, required: true })
    language: string;

    @Prop({ type: Types.ObjectId, ref: Upload.name, required: true })
    audioFile: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Movie.name })
    movie?: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Episode.name })
    episode?: Types.ObjectId;
}

export const AudioSchema = SchemaFactory.createForClass(Audio)