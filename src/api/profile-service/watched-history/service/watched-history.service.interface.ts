import { Request } from "express";
import { CreateWatchedHistoryDto } from "../dto/create-watched-history.dto";
import { WatchedHistoryQuery } from "../dto/watched-history-query.dto";
import { WatchedHistory } from "../entities/watched-history.entity";
import { GetWatchedHistoryDto } from "../dto/get-watched-history.dto";

export interface RecordWatchedHistoryParams {
    payload: CreateWatchedHistoryDto;
    req: Request;
}
export interface GetAllWatchedHistoryParams {
    req: Request;
    queryFields: WatchedHistoryQuery;
}
export interface GetWatchedHistoryParams {
    queryFields: GetWatchedHistoryDto;
    req: Request;
}
export interface IWatchedHistoryService {
    recordWatchedHistory(params: RecordWatchedHistoryParams): Promise<string>;
    getAllWatchedHistory(params: GetAllWatchedHistoryParams): Promise<WatchedHistory[]>;
    getWatchedHistory(params: GetWatchedHistoryParams): Promise<WatchedHistory | null>;
}