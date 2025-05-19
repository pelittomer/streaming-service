import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Types } from "mongoose";

enum SeriesSort {
    RATINGS_DESC = 'rate_desc',
    CREATED_AT_DESC = 'createdAt_desc',
}

export class GetSeriesDto {
    @ApiPropertyOptional({
        description: 'Search term for series title',
        type: String,
        example: 'The'
    })
    @IsOptional()
    @IsString()
    q?: string;

    @ApiPropertyOptional({
        description: 'Filter series by category ID',
        type: String,
        example: '654a7b8c9d1e2f3a4b5c6d7e'
    })
    @IsOptional()
    @IsMongoId()
    categoryId?: Types.ObjectId;

    @ApiPropertyOptional({
        enum: SeriesSort,
        description: 'Sort order for series',
        type: String,
        example: SeriesSort.RATINGS_DESC
    })
    @IsOptional()
    @IsEnum(SeriesSort)
    sort?: SeriesSort;

    @ApiPropertyOptional({
        description: 'Page number for pagination',
        type: Number,
        example: 1,
        minimum: 1
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;
}

export class PartialGetSeriesDto extends PartialType(GetSeriesDto) { }
