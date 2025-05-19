import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class GetEpisodeDto {
    @ApiProperty({
        description: 'The ID of the season this episode belongs to',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e',
        required: true
    })
    @IsNotEmpty()
    @IsMongoId()
    season: Types.ObjectId;
}