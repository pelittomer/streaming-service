import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "./schemas/profile.schema";
import { Model } from "mongoose";

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<Profile>
    ) { }

}