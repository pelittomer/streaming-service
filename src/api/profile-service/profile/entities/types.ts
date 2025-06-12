import { Document } from "mongoose";
import { Profile } from "./profile.entity";

export type ProfileDocument = Profile & Document;