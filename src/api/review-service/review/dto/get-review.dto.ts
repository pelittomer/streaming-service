import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class GetReviewDto {
    @ApiProperty({
        description: 'The ID of the movie',
        type: String,
        format: 'objectId'
    })
    @IsMongoId()
    @IsOptional()
    movie: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the episode',
        type: String,
        format: 'objectId'
    })
    @IsMongoId()
    @IsOptional()
    episode: Types.ObjectId;
}


export class PartialGetReviewDto extends PartialType(GetReviewDto) { }