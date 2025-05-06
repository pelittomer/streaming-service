import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Season } from "./schemas/season.schema";
import { Model } from "mongoose";

@Injectable()
export class SeasonRepository {
    constructor(
        @InjectModel(Season.name) private seasonModel: Model<Season>
    ) { }

}