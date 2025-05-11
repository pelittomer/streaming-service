import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsMongoId, IsNumber, IsString, Min } from "class-validator";
import { Types } from "mongoose";

enum MovieSort {
    RATINGS_DESC = 'rate_desc',
    CREATED_AT_DESC = 'createdAt_desc',
}

export class GetMovieDto {
    @IsString()
    q: string;

    @IsMongoId()
    categoryId: Types.ObjectId;

    @IsEnum(MovieSort)
    sort: MovieSort;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number;
}

export class PartialGetMovieDto extends PartialType(GetMovieDto) { }
