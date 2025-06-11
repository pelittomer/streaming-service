import { Types } from "mongoose";
import { CreateEpisodeDto } from "../dto/create-episode.dto";
import { GetEpisodeDto } from "../dto/get-episode.dto";
import { Episode } from "../entities/episode.entity";

export interface IEpisodeService {
    addEpisode(payload: CreateEpisodeDto): Promise<string>;
    getAllEpisode(queryFields: GetEpisodeDto): Promise<Episode[]>;
    getEpisodeById(episodeId: Types.ObjectId): Promise<Episode>;
}