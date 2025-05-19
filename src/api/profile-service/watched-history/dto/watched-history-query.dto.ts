import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class WatchedHistoryQuery {
    @ApiProperty({
        description: 'The ID of the user profile whose favorites are being requested',
        example: '612a8e6071c28a0015a7b123',
        type: 'string',
        format: 'objectId',
    })
    @IsMongoId()
    @IsNotEmpty()
    profile: Types.ObjectId;
}