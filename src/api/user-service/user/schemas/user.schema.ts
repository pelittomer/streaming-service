import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/common/types";

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Boolean, default: false })
    isEmailVerified: boolean;

    @Prop({ type: String, default: null })
    emailVerificationToken?: string;

    @Prop({ type: Date, default: null })
    emailVerificationTokenExpriesAt: Date;

    @Prop({ type: String, required: true, enum: Role, default: Role.Customer })
    roles: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
