import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateAudioDto {
    @IsMongoId()
    @IsOptional()
    movie: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    episode: Types.ObjectId;

    @IsString()
    language:string;
}