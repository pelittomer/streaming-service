import { IsNotEmpty, IsOptional, IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateReviewDto {
    @ApiProperty({
        description: 'The content of the review',
        minLength: 3,
        maxLength: 500
    })
    @IsString()
    @IsNotEmpty()
    comment: string;

    @ApiProperty({
        description: 'The ID of the related movie (optional)',
        type: String,
        format: 'objectId',
        required: false
    })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the related episode (optional)',
        type: String,
        format: 'objectId',
        required: false
    })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;

    @ApiProperty({
        description: 'The ID of the user profile creating the review',
        type: String,
        format: 'objectId',
        required: true,
    })
    @IsMongoId()
    @IsNotEmpty()
    profile: Types.ObjectId;
}