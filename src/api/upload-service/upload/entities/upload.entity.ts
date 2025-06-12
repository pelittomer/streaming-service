import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Upload {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    mimeType: string;

    @Prop({ type: Buffer })
    data: Buffer;

    @Prop({ type: String })
    gridFsFileId: string;
}

export const UploadSchema = SchemaFactory.createForClass(Upload)