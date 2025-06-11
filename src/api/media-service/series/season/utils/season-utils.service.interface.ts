import { Types } from "mongoose";

export interface ISeasonUtilsService {
    verifySeriesExistence(seriesId: Types.ObjectId): Promise<void>;
}