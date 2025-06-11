import { Document } from "mongoose";
import { Series } from "./series.entity";

export type SeriesDocument = Series & Document;
