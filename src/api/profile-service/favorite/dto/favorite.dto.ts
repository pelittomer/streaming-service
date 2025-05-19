import { Types } from 'mongoose';
import { IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetFavoriteDto } from './get-favorite.dto';

export class CreateFavoriteDto extends GetFavoriteDto {
    @ApiProperty({
        description: 'The ID of a movie to add or update in the list',
        example: '654321abcdef0987654321',
        required: false
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of a series to add or update in the list',
        example: 'fedcba9876543210fedcba98',
        required: false
    })
    @IsOptional()
    @IsMongoId()
    series?: Types.ObjectId;
}
