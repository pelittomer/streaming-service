import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Episode } from "./schemas/episode.schema";
import { Model } from "mongoose";

@Injectable()
export class EpisodeRepository {
    constructor(
        @InjectModel(Episode.name) private episodeModel: Model<Episode>
    ) { }
    
}
