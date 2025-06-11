import { Types } from "mongoose";

export interface ValidateEntityExistenceParams {
    id: Types.ObjectId | undefined;
    repository: any;
    entityName: string;
}
export interface ValidateMovieOrEpisodeParams {
    movie?: Types.ObjectId;
    episode?: Types.ObjectId;
}
export interface IReviewUtilsService {
    validateEntityExistence(params: ValidateEntityExistenceParams): Promise<void>;
    validateMovieOrEpisode(params: ValidateMovieOrEpisodeParams): Promise<void>;
}