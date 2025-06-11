import { Types } from "mongoose";
import { CreateAudioDto } from "../dto/create-audio.dto";

export interface IAudioUtilsService {
    validateFile(uploadedFile: Express.Multer.File): Promise<void>;
    validateAssociation(payload: CreateAudioDto): Promise<void>;
    verifyMovieExistence(movieId: Types.ObjectId): Promise<void>;
    verifyEpisodeExistence(episodeId: Types.ObjectId): Promise<void>;
}