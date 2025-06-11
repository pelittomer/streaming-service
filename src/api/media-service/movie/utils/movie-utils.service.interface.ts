import { Types } from "mongoose";
import { Movie } from "../entities/movie.entity";

export interface IMovieUtilsService {
    validateFile(uploadedFile: Express.Multer.File): Promise<void>;
    checkIfMovieExists(title: string): Promise<void>;
    getExistingMovie(movieId: Types.ObjectId): Promise<Movie>;
}