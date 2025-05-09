import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CategoryDocument = Category & Document

@Schema()
export class Category {
    @Prop({ type: String, required: true, unique: true })
    name: string;

    @Prop({ type: Number, min: 0, default: 0 })
    views: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category)