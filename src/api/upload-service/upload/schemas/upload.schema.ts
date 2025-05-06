import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UploadDocument = Upload & Document

export class Upload {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    mimeType: string;

    @Prop({ type: Buffer, required: true })
    data: Buffer;
}

export const UploadSchema = SchemaFactory.createForClass(Upload)