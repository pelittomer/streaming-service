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
import { FilmographyRole, Gender } from 'src/common/types';


class SocialMediaDto {
    @ApiPropertyOptional({
        description: 'Instagram link',
        type: String,
        example: 'https://www.instagram.com/example'
    })
    @IsOptional()
    @IsString()
    instagram?: string;

    @ApiPropertyOptional({
        description: 'Twitter link',
        type: String,
        example: 'https://twitter.com/example'
    })
    @IsOptional()
    @IsString()
    twitter?: string;

    @ApiPropertyOptional({
        description: 'IMDb link',
        type: String,
        example: 'https://www.imdb.com/name/nm0000123/'
    })
    @IsOptional()
    @IsString()
    imdb?: string;
}

export class FilmographyItemDto {
    @ApiProperty({
        enum: FilmographyRole,
        description: 'Role in the filmography',
        example: FilmographyRole.DIRECTOR,
        required: true,
    })
    @IsEnum(FilmographyRole)
    @IsNotEmpty()
    role: FilmographyRole;

    @ApiProperty({
        description: 'Title of the movie or series',
        type: String,
        example: 'Inception',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string;
}


export class CreateDirectorDto {
    @ApiProperty({
        description: 'Full name of the director',
        type: String,
        example: 'Christopher Nolan',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        description: 'Birth date of the director',
        type: Date,
        example: '1970-07-30T00:00:00.000Z',
        required: true
    })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthDate: Date;

    @ApiProperty({
        description: 'Biography of the director',
        type: String,
        example: 'Christopher Nolan is a British-American filmmaker...',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    bio: string;

    @ApiProperty({
        enum: Gender,
        description: 'Gender of the director',
        example: Gender.Male,
        required: true
    })
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiPropertyOptional({
        description: 'Height of the director in centimeters',
        type: Number,
        example: 183
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    height?: number;

    @ApiPropertyOptional({
        description: 'Nationality of the director',
        type: String,
        example: 'British-American'
    })
    @IsOptional()
    @IsString()
    nationality?: string;

    @ApiPropertyOptional({
        description: 'Social media links',
        type: SocialMediaDto,
        example: { instagram: 'https://www.instagram.com/nolan', twitter: 'https://twitter.com/nolan_official' },
    })
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => SocialMediaDto)
    socialMedia?: SocialMediaDto;

    @ApiPropertyOptional({
        description: 'Awards received by the director',
        type: [String],
        example: ['Academy Award for Best Director', 'Golden Globe Award for Best Director'],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    awards?: string[];

    @ApiPropertyOptional({
        description: 'List of MongoDB ObjectIds of known movies',
        type: [String],
        example: ['654a7b8c9d1e2f3a4b5c6d7e', '654a7b8c9d1e2f3a4b5c6d7f'],
    })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    knownForMovies?: Types.ObjectId[];

    @ApiPropertyOptional({
        description: 'List of MongoDB ObjectIds of known series',
        type: [String],
        example: ['654a7b8c9d1e2f3a4b5c6d80', '654a7b8c9d1e2f3a4b5c6d81'],
    })
    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    knownForSeries?: Types.ObjectId[];

    @ApiPropertyOptional({
        description: 'Filmography of the director',
        type: [Object],
        example: [{ role: FilmographyRole.DIRECTOR, title: 'Batman Begins' }, { role: FilmographyRole.WRITER, title: 'Inception' }],
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilmographyItemDto)
    filmography?: FilmographyItemDto[];
}