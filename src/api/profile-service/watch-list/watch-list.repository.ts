import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WatchList } from "./schemas/watch-list.schema";
import { Model } from "mongoose";

@Injectable()
export class WatchListRepository {
    constructor(
        @InjectModel(WatchList.name) private watchListModel: Model<WatchList>
    ) { }
}