import { Document } from "mongoose";
import { Audio } from "./audio.entity";

export type AudioDocument = Audio & Document;
