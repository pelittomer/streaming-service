import { Types } from "mongoose";
import { Episode } from "../entities/episode.entity";

export interface IEpisodeUtilsService {
    verifySeasonExistence(seasonId: Types.ObjectId): Promise<void>;
    getExistingEpisode(episodeId: Types.ObjectId): Promise<Episode>;
}