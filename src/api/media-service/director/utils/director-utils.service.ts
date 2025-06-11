import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DIRECTOR_MESSAGES } from "../constants/director.message";
import { IDirectorUtilsService } from "./director-utils.service.interface";
import { Director } from "../entities/director.entity";
import { Types } from "mongoose";
import { DirectorRepository } from "../repository/director.repository";

@Injectable()
export class DirectorUtilsService implements IDirectorUtilsService {
    constructor(
        private readonly directorRepository: DirectorRepository,
    ) { }

    async validateFile(uploadedFile: Express.Multer.File): Promise<void> {
        if (!uploadedFile || !uploadedFile.mimetype.startsWith('image/')) {
            throw new BadRequestException(DIRECTOR_MESSAGES.INVALID_IMAGE_FILE)
        }
    }

    async getExistingDirector(directorId: Types.ObjectId): Promise<Director> {
        const director = await this.directorRepository.findById(directorId)
        if (!director) {
            throw new NotFoundException(DIRECTOR_MESSAGES.DIRECTOR_NOT_FOUND(directorId.toString()))
        }
        return director
    }
}