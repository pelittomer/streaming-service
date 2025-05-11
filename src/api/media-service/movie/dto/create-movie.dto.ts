import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMovieDto {
    @ApiProperty({ description: 'Movie title', example: 'Inception' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'Movie synopsis', example: 'A thief who enters the dreams of others to steal their secrets.' })
    @IsString()
    @IsNotEmpty()
    synopsis: string;

    @ApiProperty({ description: 'Movie duration in minutes', example: 148 })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    duration: number;

    @ApiProperty({ description: 'Movie trailer URL', example: 'https://www.youtube.com/watch?v=YoHD9XE0rgY' })
    @IsString()
    @IsNotEmpty()
    trailer: string;

    @ApiProperty({ description: 'Country of origin', example: 'USA' })
    @IsString()
    @IsNotEmpty()
    countryOfOrigin: string;

    @ApiProperty({ description: 'Production company', example: 'Warner Bros. Pictures' })
    @IsString()
    @IsNotEmpty()
    productionCompany: string;

    @ApiProperty({ description: 'Category ObjectIds', example: ['64ca9c1e3a8b4e279b7a3001', '64ca9c1e3a8b4e279b7a3002'], type: [String] })
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    category: Types.ObjectId[];

    @ApiProperty({ description: 'Director ObjectId', example: '64ca9c1e3a8b4e279b7a3004', type: String })
    @IsMongoId()
    @IsNotEmpty()
    directors: Types.ObjectId;

    @ApiProperty({ description: 'Cast Member ObjectIds', example: ['64ca9c1e3a8b4e279b7a3005', '64ca9c1e3a8b4e279b7a3006'], type: [String] })
    @IsArray()
    @IsMongoId({ each: true })
    @IsNotEmpty()
    cast: Types.ObjectId[];
}