import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/entities/upload.entity";
import { Movie } from "../../movie/entities/movie.entity";
import { Episode } from "../../series/episode/entities/episode.entity";

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