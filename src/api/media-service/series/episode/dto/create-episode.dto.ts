import { Types } from 'mongoose';
import { IsNotEmpty, IsString, IsNumber, Min, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEpisodeDto {
    @ApiProperty({ description: 'The title of the episode', example: 'The First Encounter' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'A brief summary of the episode', example: 'The main characters meet for the first time.' })
    @IsNotEmpty()
    @IsString()
    synopsis: string;

    @ApiProperty({ description: 'The episode number within the season', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    episodeNumber: number;

    @ApiProperty({ description: 'The duration of the episode in minutes', example: 45 })
    @IsNotEmpty()

    @Type(() => Number)
    duration: number;

    @ApiProperty({ description: 'The ID of the associated season', example: '654321abcdef0987654321' })
    @IsNotEmpty()
    @IsMongoId()
    season: Types.ObjectId;
}