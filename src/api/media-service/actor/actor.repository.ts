import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Actor } from "./schemas/actor.schema";
import { Model } from "mongoose";

@Injectable()
export class ActorRepository {
    constructor(
        @InjectModel(Actor.name) private actorModel: Model<Actor>
    ) { }

}