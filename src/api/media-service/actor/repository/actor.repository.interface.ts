import { Types } from "mongoose";
import { ActorDocument } from "../entities/types";
import { CreateActorDto } from "../dto/create-actor.dto";

export interface CreateActorOptions {
    payload: CreateActorDto;
    uploadedImage: Express.Multer.File;
}
export type TFindActor = Pick<ActorDocument, '_id' | 'fullName' | 'profilePicture'>[];
export interface IActorRepository {
    create(params: CreateActorOptions): Promise<void>;
    find(): Promise<TFindActor>;
    findById(actorId: Types.ObjectId): Promise<ActorDocument | null>;
}