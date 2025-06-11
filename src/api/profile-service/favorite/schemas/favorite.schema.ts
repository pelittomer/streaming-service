import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "src/api/media-service/movie/entities/movie.entity";
import { Series } from "src/api/media-service/series/series/schemas/series.schema";
import { Profile } from "../../profile/schemas/profile.schema";

export type FavoriteDocument = Favorite & Document

@Schema({ timestamps: true })
export class Favorite {
    @Prop({ type: [{ type: Types.ObjectId, ref: Movie.name }], default: [] })
    movie: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: Series.name }], default: [] })
    series: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: Profile.name, required: true, unique: true })
    profile: Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite)