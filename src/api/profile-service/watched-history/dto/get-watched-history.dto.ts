import { IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";
import { WatchedHistoryQuery } from "./watched-history-query.dto";
import { ApiProperty } from "@nestjs/swagger";

export class GetWatchedHistoryDto extends WatchedHistoryQuery {
    @ApiProperty({
        description: 'Optional ID of the movie to filter watched history',
        example: '612a8e6071c28a0015a7b123',
        type: 'string',
        format: 'objectId',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'Optional ID of the episode to filter watched history',
        example: '612b9f7182d39b0026b8c456',
        type: 'string',
        format: 'objectId',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;
}
