import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";


export class GetEpisodeDto {
    @IsMongoId()
    @IsNotEmpty()
    season: Types.ObjectId;
}