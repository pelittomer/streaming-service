import { WatchedHistoryDocument } from "../entities/types";
import { WatchedHistory } from "../entities/watched-history.entity";

export type TExistsHistory = Pick<WatchedHistoryDocument, '_id'> | null;
export interface FindOneAndUpdateHistoryOptions {
    queryFields: Partial<WatchedHistory>;
    payload: Pick<WatchedHistory, 'watchDuration'>;
}
export interface IWatchedHistoryRepository {
    exists(queryFields: Partial<WatchedHistory>): Promise<TExistsHistory>;
    findOneAndUpdate(params: FindOneAndUpdateHistoryOptions): Promise<void>;
    find(queryFields: Partial<WatchedHistory>): Promise<WatchedHistory[]>;
    findOne(queryFields: Partial<WatchedHistory>): Promise<WatchedHistory | null>;
}