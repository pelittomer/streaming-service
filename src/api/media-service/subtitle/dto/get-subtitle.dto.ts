import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class GetSubtitleDto {
    @ApiPropertyOptional({
        description: 'The ID of the movie to associate the subtitle with (optional)',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e'
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiPropertyOptional({
        description: 'The ID of the episode to associate the subtitle with (optional)',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7f'
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;
}

export class PartialGetSubtitleDto extends PartialType(GetSubtitleDto) { }