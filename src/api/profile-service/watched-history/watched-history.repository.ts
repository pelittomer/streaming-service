import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WatchedHistory } from "./schemas/watched-history.schema";
import { Model } from "mongoose";

@Injectable()
export class WatchedHistoryRepository {
    constructor(
        @InjectModel(WatchedHistory.name) private watchedHistoryModel: Model<WatchedHistory>
    ) { }

}