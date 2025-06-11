import { Types } from "mongoose";
import { CreateAudioDto } from "../dto/create-audio.dto";
import { PartialGetAudioDto } from "../dto/get-audio.dto";
import { TFindAudio } from "../repository/audio.repository.interface";

export interface TAudioData {
    movie?: Types.ObjectId;
    episode?: Types.ObjectId;
    language: string
}
export interface AddAudioParams {
    payload: CreateAudioDto;
    uploadedFile: Express.Multer.File;
}
export interface IAudioService {
    addAudio(params: AddAudioParams): Promise<string>;
    getAllAudios(query: PartialGetAudioDto): Promise<TFindAudio>;
}