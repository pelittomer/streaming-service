import { CreateSeasonDto } from "../dto/create-season.dto"
import { Season } from "../entities/season.enity";
import { SeasonDocument } from "../entities/types";

export interface CreateSeasonOptions {
    payload: CreateSeasonDto;
    uploadedFile: Express.Multer.File;
}
export type TFindSeason = Pick<Season, 'sessionNumber'>[];
export type ExistsSeasonOptions = Season | Pick<SeasonDocument, '_id'>;
export type TExistsSeason = Pick<SeasonDocument, '_id'> | null;

export interface ISeasonRepository {
    create(params: CreateSeasonOptions): Promise<void>;
    find(queryFields: Partial<Season>): Promise<TFindSeason>;
    exists(queryFields: Partial<ExistsSeasonOptions>): Promise<TExistsSeason>;
}