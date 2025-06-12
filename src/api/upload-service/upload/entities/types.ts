import { Document } from "mongoose";
import { Upload } from "./upload.entity";

export type UploadDocument = Upload & Document;
