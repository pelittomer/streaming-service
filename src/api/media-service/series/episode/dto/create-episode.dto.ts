import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetEpisodeDto } from './get-episode.dto';

export class CreateEpisodeDto extends GetEpisodeDto {
    @ApiProperty({
        description: 'The title of the episode',
        type: String,
        example: 'The First Encounter',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'A brief summary of the episode',
        type: String,
        example: 'The main characters meet for the first time.',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    synopsis: string;

    @ApiProperty({
        description: 'The episode number within the season',
        type: Number,
        example: 1,
        minimum: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    episodeNumber: number;

    @ApiProperty({
        description: 'The duration of the episode in minutes',
        type: Number,
        example: 45,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    duration: number;
}