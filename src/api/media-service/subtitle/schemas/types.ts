import { Document } from "mongoose";
import { Subtitle } from "./subtitle.schema";

export type SubtitleDocument = Subtitle & Document;
