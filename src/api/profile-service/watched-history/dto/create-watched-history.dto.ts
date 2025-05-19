import { IsNumber, IsOptional, IsMongoId, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { WatchedHistoryQuery } from './watched-history-query.dto';

export class CreateWatchedHistoryDto extends WatchedHistoryQuery {
    @ApiProperty({ description: 'The watch duration in seconds.', example: 120 })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    watchDuration: number;

    @ApiProperty({
        description: 'The ID of the movie watched (if applicable).',
        example: '64b0c3e79a7b8d3b3f9d7b2a',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the episode watched (if applicable).',
        example: '64b0c3e79a7b8d3b3f9d7b2b',
        required: false,
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;
}