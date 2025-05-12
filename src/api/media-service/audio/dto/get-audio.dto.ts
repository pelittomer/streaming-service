import { PartialType } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";

export class GetAudioDto {
    @IsMongoId()
    movie: Types.ObjectId;

    @IsMongoId()
    episode: Types.ObjectId;
}

export class PartialGetAudioDto extends PartialType(GetAudioDto) { }