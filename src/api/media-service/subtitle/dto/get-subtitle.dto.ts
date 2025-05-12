import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class GetSubtitleDto {
    @IsMongoId()
    movie: Types.ObjectId;

    @IsMongoId()
    episode: Types.ObjectId;
}

export class PartialGetSubtitleDto extends PartialType(GetSubtitleDto) { }