import { Types } from 'mongoose';
import { IsString, IsNotEmpty, IsMongoId, IsOptional, ArrayMinSize, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSeriesDto {
    @ApiProperty({
        description: 'The title of the series',
        type: String,
        example: 'The Sopranos',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'The IDs of the categories the series belongs to',
        type: [String],
        example: ['64b3c8e9374a9a3f8a2b9c1d', '64b3c8f1374a9a3f8a2b9c1e'],
        required: true,
    })
    @IsArray()
    @IsMongoId({ each: true })
    @ArrayMinSize(1)
    category: Types.ObjectId[];

    @ApiProperty({
        description: 'The ID of the director of the series',
        type: String,
        example: '64b3c8a1374a9a3f8a2b9c1c',
        required: true
    })
    @IsMongoId()
    @IsNotEmpty()
    directors: Types.ObjectId;

    @ApiProperty({
        description: 'The IDs of the cast members of the series',
        type: [String],
        example: ['64b3c905374a9a3f8a2b9c1f', '64b3c912374a9a3f8a2b9c20'],
        required: true,
    })
    @IsArray()
    @IsMongoId({ each: true })
    @ArrayMinSize(1)
    cast: Types.ObjectId[];

    @ApiProperty({
        description: 'The country of origin of the series',
        type: String,
        example: 'USA',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    countryOfOrigin: string;

    @ApiPropertyOptional({
        description: 'The production company of the series (optional)',
        type: String,
        example: 'HBO'
    })
    @IsOptional()
    @IsString()
    productionCompany?: string;

    @ApiPropertyOptional({
        description: 'The trailer link of the series (optional)',
        type: String,
        example: 'https://www.example.com/trailer.mp4'
    })
    @IsOptional()
    @IsString()
    trailer?: string;

    @ApiProperty({
        description: 'A brief summary of the series',
        type: String,
        example: 'New Jersey based Italian-American mob boss Tony Soprano juggles his family life and his role as the leader of a criminal organization.',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    synopsis: string;
}