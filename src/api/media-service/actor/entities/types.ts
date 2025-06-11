import { Document } from "mongoose";
import { Actor } from "./actor.entity";

export type ActorDocument = Actor & Document;

