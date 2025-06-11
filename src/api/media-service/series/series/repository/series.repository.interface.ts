import { Types } from "mongoose";
import { Series } from "../entities/series.entity";
import { SeriesDocument } from "../entities/types";

export type ExistsSeriesOptions = Series | Pick<SeriesDocument, '_id'>;
export type TExistsSeries = Pick<SeriesDocument, '_id'> | null;
export interface CreateSeriesOptions {
    payload: Partial<Series>;
    uploadedFile: Express.Multer.File;
}
export interface FindSeriesOptions {
    limit: number;
    startIndex: number;
    filter: any;
    sortCriteria: any;
}
export type TFindSeries = Pick<SeriesDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[];
export interface ISeriesRepository {
    exists(queryFields: Partial<ExistsSeriesOptions>): Promise<TExistsSeries>;
    create(params: CreateSeriesOptions): Promise<void>;
    find(params: FindSeriesOptions): Promise<TFindSeries>;
    findById(movieId: Types.ObjectId): Promise<Series | null>;
}