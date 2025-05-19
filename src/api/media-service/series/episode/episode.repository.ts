import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Episode, EpisodeDocument } from "./schemas/episode.schema";
import { Model, Types } from "mongoose";

@Injectable()
export class EpisodeRepository {
    constructor(
        @InjectModel(Episode.name) private episodeModel: Model<Episode>
    ) { }

    async exists(
        queryFields: Partial<Episode | Pick<EpisodeDocument, '_id'>>
    ): Promise<Pick<EpisodeDocument, '_id'> | null> {
        return await this.episodeModel.exists(queryFields)
    }

    async create(userInputs: Partial<Episode>): Promise<void> {
        await this.episodeModel.create(userInputs)
    }

    async find(queryFields: Partial<Episode>): Promise<Episode[]> {
        return await this.episodeModel.find(queryFields)
    }

    async findById(episodeId: Types.ObjectId): Promise<Episode | null> {
        return await this.episodeModel.findById(episodeId).lean()
    }
}
