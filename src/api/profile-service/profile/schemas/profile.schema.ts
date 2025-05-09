import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Upload } from "src/api/upload-service/upload/schemas/upload.schema";

export type ProfileDocument = Profile & Document

@Schema({ timestamps: true })
export class Profile {
    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, default: null })
    bio?: string;

    @Prop({ type: Types.ObjectId, ref: Upload.name })
    avatar?: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isOnline: boolean;

    @Prop({ type: Boolean, default: false })
    isActive: boolean;

    @Prop({ types: String, required: true })
    user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)