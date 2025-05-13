import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsMongoId, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSeasonDto {
    @ApiProperty({ description: 'The season number', example: 1 })
    @IsNotEmpty({ message: 'Season number cannot be empty' })
    @IsNumber({}, { message: 'Season number must be a number' })
    @Min(1, { message: 'Season number must be at least 1' })
    @Type(() => Number)
    sessionNumber: number;

    @ApiProperty({ description: 'The ID of the associated series', example: '654321abcdef0987654321' })
    @IsNotEmpty({ message: 'Series ID cannot be empty' })
    @IsMongoId({ message: 'Invalid series ID format' })
    series: Types.ObjectId;

    @ApiProperty({ description: 'The URL of the season trailer (optional)', example: 'https://example.com/trailer.mp4', required: false })
    @IsOptional()
    @IsString({ message: 'Trailer URL must be a string' })
    trailer?: string;
}