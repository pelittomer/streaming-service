import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/entities/upload.entity";
import { Movie } from "../../movie/entities/movie.entity";
import { Episode } from "../../series/episode/entities/episode.entity";

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