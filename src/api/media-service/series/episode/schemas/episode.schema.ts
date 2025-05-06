import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type EpisodeDocument = Episode & Document

@Schema({ timestamps: true })
export class Episode {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    synopsis: string;

    @Prop({ type: Number, required: true })
    episodeNumber: number;

    @Prop({ type: Number, required: true })
    duration: number;

    @Prop({ type: Types.ObjectId, required: true })
    season: Types.ObjectId;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode)