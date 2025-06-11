import { Types } from "mongoose";
import { Series } from "../entities/series.entity";

export interface ISeriesUtilsService {
    validateFile(uploadedFile: Express.Multer.File):void;
    checkIfSeriesExists(title: string): Promise<void>;
    getExistingSeries(seriesId: Types.ObjectId): Promise<Series>;
}