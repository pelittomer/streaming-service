import { Types } from "mongoose";
import { CreateSubtitleDto } from "../dto/create-subtitle.dto";

export interface ISubtitleUtilsService {
    validateFile(uploadedFile: Express.Multer.File): Promise<void>;
    validateAssociation(payload: CreateSubtitleDto): Promise<void>;
    verifyMovieExistence(movieId: Types.ObjectId): Promise<void>;
    verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void>;
}