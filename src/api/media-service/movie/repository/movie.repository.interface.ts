import { Types } from "mongoose";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { Movie } from "../entities/movie.entity"
import { MovieDocument } from "../entities/types"

export type ExistsMovieOptions = Movie | Pick<MovieDocument, '_id'>;
export type TExistsMovie = Pick<MovieDocument, '_id'> | null;
export interface CreateMovieOptions {
    payload: CreateMovieDto;
    uploadedFile: Express.Multer.File;
}
export interface FindMovieOptions {
    limit: number,
    startIndex: number,
    filter: any,
    sortCriteria: any
}
export type TFindMovie = Pick<MovieDocument, '_id' | 'title' | 'synopsis' | 'rate' | 'poster'>[]
export interface IMovieRepository {
    exists(queryFields: Partial<ExistsMovieOptions>): Promise<TExistsMovie>;
    create(params: CreateMovieOptions): Promise<void>;
    find(params: FindMovieOptions): Promise<TFindMovie>;
    findById(movieId: Types.ObjectId): Promise<Movie | null>;
}