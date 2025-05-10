import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsDate,
    IsOptional,
    IsNumber,
    IsEnum,
    IsObject,
    IsArray,
    ValidateNested,
    IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { Gender } from 'src/common/types';

class SocialMediaDto {
    @ApiPropertyOptional({ description: 'Instagram link' })
    @IsOptional()
    @IsString()
    instagram?: string;

    @ApiPropertyOptional({ description: 'Twitter link' })
    @IsOptional()
    @IsString()
    twitter?: string;

    @ApiPropertyOptional({ description: 'IMDb link' })
    @IsOptional()
    @IsString()
    imdb?: string;
}

export class CreateActorDto {
    @ApiProperty({ description: 'Full name of the director' })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ description: 'Birth date of the director' })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty({ description: 'Biography of the director' })
    @IsString()
    @IsNotEmpty()
    bio: string;

    @ApiProperty({ enum: Gender, description: 'Gender of the director' })
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiPropertyOptional({ description: 'Height of the director in centimeters' })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    height?: number;

    @ApiPropertyOptional({ description: 'Nationality of the director' })
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiPropertyOptional({ description: 'Social media links', type: SocialMediaDto })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SocialMediaDto)
    socialMedia?: SocialMediaDto;

    @ApiPropertyOptional({ description: 'Awards received by the director', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    awards?: string[];

    @ApiPropertyOptional({ description: 'List of MongoDB ObjectIds of known movies', type: [String] })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    knownForMovies?: Types.ObjectId[];

    @ApiPropertyOptional({ description: 'List of MongoDB ObjectIds of known series', type: [String] })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    knownForSeries?: Types.ObjectId[];
}
