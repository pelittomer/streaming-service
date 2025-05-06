import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Director } from "./schemas/director.schema";
import { Model } from "mongoose";

@Injectable()
export class DirectorRepository {
    constructor(
        @InjectModel(Director.name) private directorModel: Model<Director>
    ) { }


}