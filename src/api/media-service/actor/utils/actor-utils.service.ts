import { BadRequestException, Injectable } from "@nestjs/common";
import { IActorUtilsService } from "./actor-utils.service.interface";
import { ACTOR_MESSAGES } from "../constants/actor.message";

@Injectable()
export class ActorUtilsService implements IActorUtilsService {
    constructor() { }

    async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
        if (!uploadedFile || !uploadedFile.mimetype.startsWith('image/')) {
            throw new BadRequestException(ACTOR_MESSAGES.INVALID_IMAGE_FILE)
        }
    }
}