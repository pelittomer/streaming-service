import { Types } from "mongoose";
import { Episode } from "../entities/episode.entity"
import { EpisodeDocument } from "../entities/types"

export type ExistsEpiosdeOptions = Episode | Pick<EpisodeDocument, '_id'>;
export type TExistsEpisode = Pick<EpisodeDocument, '_id'> | null;
export interface IEpisodeRepository {
    exists(queryFields: Partial<ExistsEpiosdeOptions>): Promise<TExistsEpisode>;
    create(payload: Partial<Episode>): Promise<void>;
    find(queryFields: Partial<Episode>): Promise<Episode[]>;
    findById(episodeId: Types.ObjectId): Promise<Episode | null>;
}