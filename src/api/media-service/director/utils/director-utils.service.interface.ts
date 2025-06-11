import { Types } from "mongoose";
import { Director } from "../entities/director.entity";

export interface IDirectorUtilsService {
    validateFile(uploadedFile: Express.Multer.File): Promise<void>;
    getExistingDirector(directorId: Types.ObjectId): Promise<Director>;
}