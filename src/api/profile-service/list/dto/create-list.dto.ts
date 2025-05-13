import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
    @ApiProperty({ description: 'The name of the list', example: 'My Favorite Sci-Fi Movies' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'A description of the list', example: 'A collection of my top science fiction films.' })
    @IsNotEmpty()
    @IsString()
    description: string;
}