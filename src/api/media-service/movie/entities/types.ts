import { Document } from "mongoose";
import { Movie } from "./movie.entity";

export type MovieDocument = Movie & Document;
