import { PartialType } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class GetReviewDto {
    @IsMongoId()
    movie: Types.ObjectId;

    @IsMongoId()
    episode: Types.ObjectId;
}

export class PartialGetReviewDto extends PartialType(GetReviewDto) { }