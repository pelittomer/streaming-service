import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WatchedHistory, WatchedHistoryDocument } from "./schemas/watched-history.schema";
import { Model } from "mongoose";

@Injectable()
export class WatchedHistoryRepository {
    constructor(
        @InjectModel(WatchedHistory.name) private watchedHistoryModel: Model<WatchedHistory>
    ) { }

    async exists(
        queryFields: Partial<WatchedHistory>
    ): Promise<Pick<WatchedHistoryDocument, '_id'> | null> {
        return await this.watchedHistoryModel.exists(queryFields)
    }

    async findOneAndUpdate(
        queryFields: Partial<WatchedHistory>,
        userInputs: Pick<WatchedHistory, 'watchDuration'>
    ): Promise<void> {
        await this.watchedHistoryModel.findOneAndUpdate(queryFields, userInputs, { upsert: true })
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