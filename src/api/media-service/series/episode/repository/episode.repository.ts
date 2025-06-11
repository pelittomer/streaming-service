import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Episode } from "../entities/episode.entity";
import { Model, Types } from "mongoose";
import { ExistsEpiosdeOptions, IEpisodeRepository, TExistsEpisode } from "./episode.repository.interface";

@Injectable()
export class EpisodeRepository implements IEpisodeRepository{
    constructor(
        @InjectModel(Episode.name) private episodeModel: Model<Episode>
    ) { }

    async exists(queryFields:Partial<ExistsEpiosdeOptions>): Promise<TExistsEpisode> {
        return await this.episodeModel.exists(queryFields)
    }

    async create(payload: Partial<Episode>): Promise<void> {
        await this.episodeModel.create(payload)
    }

    async find(queryFields: Partial<Episode>): Promise<Episode[]> {
        return await this.episodeModel.find(queryFields)
    }

    async findById(episodeId: Types.ObjectId): Promise<Episode | null> {
        return await this.episodeModel.findById(episodeId).lean()
    }
}
