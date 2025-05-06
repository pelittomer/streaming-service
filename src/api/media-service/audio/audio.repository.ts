import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Audio } from "./schemas/audio.schema";
import { Model } from "mongoose";

@Injectable()
export class AudioRepository {
    constructor(
        @InjectModel(Audio.name) private audioModel: Model<Audio>
    ) { }

}