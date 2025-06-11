import { CreateSeasonDto } from "../dto/create-season.dto";
import { GetSeasonDto } from "../dto/get-season.dto";
import { TFindSeason } from "../repository/season.repository.interface";

export interface AddSeasonParams {
    payload: CreateSeasonDto;
    uploadedFile: Express.Multer.File;
}

export interface ISeasonService {
    addSeason(params: AddSeasonParams): Promise<string>;
    getAllSeasons(queryFields: GetSeasonDto): Promise<TFindSeason>;
}