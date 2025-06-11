import { Types } from "mongoose";
import { CreateDirectorDto } from "../dto/create-director.dto"
import { DirectorDocument } from "../entities/types";
import { Director } from "../entities/director.entity";

export interface CreateDirectorOptions {
    payload: CreateDirectorDto;
    uploadedImage: Express.Multer.File;
}
export type TFindDirector = Pick<DirectorDocument, '_id' | 'fullName' | 'profilePicture'>[];
export interface IDirectorRepository {
    create(params: CreateDirectorOptions): Promise<void>;
    find(): Promise<TFindDirector>;
    findById(directorId: Types.ObjectId): Promise<Director | null>;
}