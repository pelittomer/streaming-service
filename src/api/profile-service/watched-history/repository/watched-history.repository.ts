import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WatchedHistory } from "../entities/watched-history.entity";
import { FindOneAndUpdateHistoryOptions, IWatchedHistoryRepository, TExistsHistory } from "./watched-history.repository.interface";

@Injectable()
export class WatchedHistoryRepository implements IWatchedHistoryRepository{
    constructor(
        @InjectModel(WatchedHistory.name) private watchedHistoryModel: Model<WatchedHistory>
    ) { }

    async exists(queryFields: Partial<WatchedHistory>): Promise<TExistsHistory> {
        return await this.watchedHistoryModel.exists(queryFields)
    }

    async findOneAndUpdate({ payload, queryFields }: FindOneAndUpdateHistoryOptions
    ): Promise<void> {
        await this.watchedHistoryModel.findOneAndUpdate(queryFields, payload, { upsert: true })
    }

    async find(queryFields: Partial<WatchedHistory>): Promise<WatchedHistory[]> {
        return await this.watchedHistoryModel.find(queryFields)
            .populate('movie episode')
            .lean()
    }

    async findOne(queryFields: Partial<WatchedHistory>): Promise<WatchedHistory | null> {
        return await this.watchedHistoryModel.findOne(queryFields).lean()
    }
}