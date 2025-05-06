import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";
import { FilmographyRole, Gender } from "src/common/types";
import { Movie } from "../../movie/schemas/movie.schema";
import { Series } from "../../series/series/schemas/series.schema";
import { forwardRef } from "@nestjs/common";

export type DirectorDocument = Director & Document

export class Director {
    @Prop({ type: String, required: true })
    fullName: string;

    @Prop({ type: Date, required: true })
    birthDate: Date;

    @Prop({ type: String, required: true })
    birthPlace: string;

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

    @Prop({ type: [{ type: Types.ObjectId, ref: Series.name }], default: [] })
    knownForSeries: Types.ObjectId[];

    @Prop({ type: [{ role: { type: String, enum: FilmographyRole }, title: String }], default: [] })
    filmography: { role: FilmographyRole; title: string }[];
}

export const DirectorSchema = SchemaFactory.createForClass(Director)