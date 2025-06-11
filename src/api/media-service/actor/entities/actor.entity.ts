import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Gender } from "src/common/types";
import { Series } from "../../series/series/entities/series.entity";
import { Movie } from "../../movie/entities/movie.entity";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";
import { forwardRef } from "@nestjs/common";

@Schema()
export class Actor {
    @Prop({ type: String, required: true })
    fullName: string;

    @Prop({ type: Date, required: true })
    birthDate: Date;

    @Prop({ type: String, required: true })
    bio: string;

    @Prop({ type: String, enum: Gender })
    gender: Gender;

    @Prop({ type: Number })
    height?: number;

    @Prop({ type: String })
    nationality?: string;

    @Prop({ type: Object })
    socialMedia?: {
        instagram?: string;
        twitter?: string;
        imdb?: string;
    };

    @Prop({ type: [String], default: [] })
    awards: string[];

    @Prop({ type: Types.ObjectId, ref: Upload.name, required: true })
    profilePicture: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: forwardRef(() => Movie.name) }], default: [] })
    knownForMovies: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: forwardRef(() => Series.name) }], default: [] })
    knownForSeries: Types.ObjectId[];
}

export const ActorSchema = SchemaFactory.createForClass(Actor)