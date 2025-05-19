import { Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsMongoId, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSeasonDto {
    @ApiProperty({
        description: 'The season number',
        type: Number,
        example: 1,
        required: true
    })
    @IsNotEmpty({ message: 'Season number cannot be empty' })
    @IsNumber({}, { message: 'Season number must be a number' })
    @Min(1, { message: 'Season number must be at least 1' })
    @Type(() => Number)
    sessionNumber: number;

    @ApiProperty({
        description: 'The ID of the associated series',
        type: String,
        example: '654321abcdef0987654321',
        required: true
    })
    @IsNotEmpty({ message: 'Series ID cannot be empty' })
    @IsMongoId({ message: 'Invalid series ID format' })
    series: Types.ObjectId;

    @ApiPropertyOptional({
        description: 'The URL of the season trailer (optional)',
        type: String,
        example: 'https://example.com/trailer.mp4'
    })
    @IsOptional()
    @IsString({ message: 'Trailer URL must be a string' })
    trailer?: string;
}