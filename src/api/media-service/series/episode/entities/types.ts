import { Document } from "mongoose";
import { Episode } from "./episode.entity";

export type EpisodeDocument = Episode & Document;
