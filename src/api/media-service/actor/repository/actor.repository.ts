import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Actor } from "../entities/actor.entity";
import { Model, Types } from "mongoose";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";
import { ActorDocument } from "../entities/types";
import { CreateActorOptions, IActorRepository, TFindActor } from "./actor.repository.interface";

@Injectable()
export class ActorRepository implements IActorRepository {
    constructor(
        @InjectModel(Actor.name) private actorModel: Model<Actor>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create({ payload, uploadedImage }: CreateActorOptions): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createFile(uploadedImage, session)
            await this.actorModel.create([{
                ...payload,
                profilePicture: imageId
            }], { session })
        })
    }

    async find(): Promise<TFindActor> {
        return await this.actorModel.find().select('fullName profilePicture').lean()
    }

    async findById(actorId: Types.ObjectId): Promise<ActorDocument | null> {
        return await this.actorModel.findById(actorId)
    }
}