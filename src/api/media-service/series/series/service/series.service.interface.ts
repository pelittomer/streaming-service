import { Types } from "mongoose";
import { CreateSeriesDto } from "../dto/create-series.dto";
import { PartialGetSeriesDto } from "../dto/get-series.dto";
import { Series } from "../entities/series.entity";
import { TFindSeries } from "../repository/series.repository.interface";

export interface AddSeriesParams {
    payload: CreateSeriesDto;
    uploadedFile: Express.Multer.File;
}
export interface ISeriesService {
    addSeries(params: AddSeriesParams): Promise<string>;
    getAllSeries(queryFields: PartialGetSeriesDto): Promise<TFindSeries>;
    getSeriesById(seriesId: Types.ObjectId): Promise<Series>;
}