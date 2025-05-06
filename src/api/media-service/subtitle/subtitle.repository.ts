import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subtitle } from "./schemas/subtitle.schema";
import { Model } from "mongoose";

@Injectable()
export class SubtitleRepository {
    constructor(
        @InjectModel(Subtitle.name) private subtitleModel: Model<Subtitle>
    ) { }

}