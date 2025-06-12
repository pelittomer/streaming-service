import { Document } from "mongoose";
import { WatchedHistory } from "./watched-history.entity";

export type WatchedHistoryDocument = WatchedHistory & Document;
