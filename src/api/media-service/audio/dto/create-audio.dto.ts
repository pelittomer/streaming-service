import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateAudioDto {
    @ApiProperty({
        description: 'The ID of the movie to associate the audio with (optional)',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the episode to associate the audio with (optional)',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7f',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;

    @ApiProperty({
        description: 'The language of the audio',
        type: String,
        example: 'en',
        required: true,
    })
    @IsString()
    language: string;
}