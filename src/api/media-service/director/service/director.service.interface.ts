import { Types } from "mongoose";
import { CreateDirectorDto } from "../dto/create-director.dto";
import { Director } from "../entities/director.entity";
import { TFindDirector } from "../repository/director.repository.interface";

export interface AddDirectorParams {
    payload: CreateDirectorDto;
    uploadedImage: Express.Multer.File;
}
export interface IDirectorService {
    addDirector(params: AddDirectorParams): Promise<string>;
    getAllDirectors(): Promise<TFindDirector>;
    getDirectorById(directorId: Types.ObjectId): Promise<Director>;
}