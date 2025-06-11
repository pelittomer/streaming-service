import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Series } from "../../series/entities/series.entity";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";

@Schema({ timestamps: true })
export class Season {
    @Prop({ type: Number, required: true })
    sessionNumber: number;

    @Prop({ type: Types.ObjectId, ref: Series.name, required: true })
    series: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Upload.name })
    poster: Types.ObjectId;

    @Prop({ type: String })
    trailer?: string;
}

export const SeasonSchema = SchemaFactory.createForClass(Season)