import { PartialType } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class GetWatchedHistoryDto {
    @IsMongoId()
    movie: Types.ObjectId;

    @IsMongoId()
    episode: Types.ObjectId;
}

export class PartialGetWatchedHistoryDto extends PartialType(GetWatchedHistoryDto) { }