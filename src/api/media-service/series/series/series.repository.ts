import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Series } from "./schemas/series.schema";
import { Model } from "mongoose";

@Injectable()
export class SeriesRepository {
    constructor(
        @InjectModel(Series.name) private seriesModel: Model<Series>
    ) { }

}