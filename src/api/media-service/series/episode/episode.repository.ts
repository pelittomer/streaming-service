import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Episode, EpisodeDocument } from "./schemas/episode.schema";
import { Model } from "mongoose";

@Injectable()
export class EpisodeRepository {
    constructor(
        @InjectModel(Episode.name) private episodeModel: Model<Episode>
    ) { }

    async exists(queryFields: Partial<Episode | Pick<EpisodeDocument, '_id'>>): Promise<Pick<EpisodeDocument, '_id'> | null> {
        return await this.episodeModel.exists(queryFields)
    }
}
