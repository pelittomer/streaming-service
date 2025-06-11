import { Types } from "mongoose";
import { ActorDocument } from "../entities/types";
import { TFindActor } from "../repository/actor.repository.interface";
import { CreateActorDto } from "../dto/create-actor.dto";

export interface AddActorParams {
    payload: CreateActorDto;
    uploadedImage: Express.Multer.File;
}
export interface IActorService {
    addActor(params: AddActorParams): Promise<string>;
    getAllActor(): Promise<TFindActor>;
    getActorById(actorId: Types.ObjectId): Promise<ActorDocument | null>
}