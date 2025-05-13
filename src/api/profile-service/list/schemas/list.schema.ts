import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose";
import { Movie } from "src/api/media-service/movie/schemas/movie.schema";
import { Series } from "src/api/media-service/series/series/schemas/series.schema";
import { ListStatus } from "src/common/types";
import { Profile } from "../../profile/schemas/profile.schema";

export type ListDocument = List & Document

@Schema({ timestamps: true })
export class List {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, default: null })
    description: string;

    @Prop({ type: String, enum: ListStatus, default: ListStatus.Private })
    status: ListStatus

    @Prop({ type: [{ type: Types.ObjectId, ref: Movie.name }], default: [] })
    movie: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: Series.name }], default: [] })
    series: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true })
    profile: Types.ObjectId;
}

export const ListSchema = SchemaFactory.createForClass(List)