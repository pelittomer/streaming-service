import { IsString } from "class-validator";
import { GetSubtitleDto } from "./get-subtitle.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSubtitleDto extends GetSubtitleDto {
    @ApiProperty({
        description: 'The language of the subtitle',
        type: String,
        example: 'en',
        required: true
    })
    @IsString()
    language: string;
}
