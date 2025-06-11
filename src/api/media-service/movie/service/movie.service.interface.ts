import { Types } from "mongoose";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { PartialGetMovieDto } from "../dto/get-movie.dto";
import { Movie } from "../entities/movie.entity";
import { TFindMovie } from "../repository/movie.repository.interface";

export interface AddMovieParams {
    payload: CreateMovieDto;
    uploadedFile: Express.Multer.File;
}
export interface IMovieService {
    addMovie(params: AddMovieParams): Promise<string>;
    getAllMovies(queryFields: PartialGetMovieDto): Promise<TFindMovie>;
    getMovieById(movieId: Types.ObjectId): Promise<Movie>;
}