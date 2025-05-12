import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UploadDocument = Upload & Document

@Schema()
export class Upload {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    mimeType: string;

    @Prop({ type: Buffer})
    data: Buffer;

    @Prop()
    gridFsFileId: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload)