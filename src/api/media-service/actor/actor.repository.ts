import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Actor } from "./schemas/actor.schema";
import { Model } from "mongoose";
import { CreateActorDto } from "./dto/create-actor.dto";
import { SharedUtilsService } from "src/common/utils/shared-utils.service";
import { UploadService } from "src/api/upload-service/upload/upload.service";

@Injectable()
export class ActorRepository {
    constructor(
        @InjectModel(Actor.name) private actorModel: Model<Actor>,
        private readonly sharedUtilsService: SharedUtilsService,
        private readonly uploadService: UploadService,
    ) { }

    async create(userInputs: CreateActorDto, uploadedImage: Express.Multer.File): Promise<void> {
        await this.sharedUtilsService.executeTransaction(async (session) => {
            const imageId = await this.uploadService.createImage(uploadedImage, session)
            await this.actorModel.create([{
                ...userInputs,
                profilePicture: imageId
            }], { session })
        })
    }
}