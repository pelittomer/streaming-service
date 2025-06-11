import { Types } from "mongoose";
import { CreateSubtitleDto } from "../dto/create-subtitle.dto";
import { TFindSubtitle } from "../repository/subtitle.repository.interface";
import { PartialGetSubtitleDto } from "../dto/get-subtitle.dto";

export interface TSubtitleData {
    movie?: Types.ObjectId;
    episode?: Types.ObjectId;
    language: string
}
export interface AddSubtitleParams {
    payload: CreateSubtitleDto;
    uploadedFile: Express.Multer.File;
}
export interface ISubtitleService {
    addSubtitle(params: AddSubtitleParams): Promise<string>;
    getAllSubtitles(queryFields: PartialGetSubtitleDto): Promise<TFindSubtitle>;
}