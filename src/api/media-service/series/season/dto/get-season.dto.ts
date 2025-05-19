import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class GetSeasonDto {
    @ApiProperty({
        description: 'The ID of the series to filter seasons by',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e',
        required: true
    })
    @IsNotEmpty()
    @IsMongoId()
    series: Types.ObjectId;
}