import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class GetAudioDto {
    @ApiProperty({
        description: 'The ID of the movie to filter audios by',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the episode to filter audios by',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7f',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;
}

export class PartialGetAudioDto extends PartialType(GetAudioDto) { }