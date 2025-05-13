import { IsMongoId } from "class-validator";
import { Types } from "mongoose";


export class GetSeasonDto {
    @IsMongoId()
    series: Types.ObjectId;
}
