import { IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateReviewDto {
    @ApiProperty({ description: 'The content of the review', minLength: 3, maxLength: 500 })
    @IsNotEmpty()
    comment: string;

    @ApiProperty({ description: 'The ID of the related movie (optional)', type: String, format: 'objectId', required: false })
    @IsOptional()
    @IsMongoId()
    movie?: Types.ObjectId;

    @ApiProperty({ description: 'The ID of the related episode (optional)', type: String, format: 'objectId', required: false })
    @IsOptional()
    @IsMongoId()
    episode?: Types.ObjectId;
}