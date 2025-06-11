import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "./types";

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, required: true, enum: Role, default: Role.Customer })
    roles: Role;
}

export const UserSchema = SchemaFactory.createForClass(User)
