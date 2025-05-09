import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
    @ApiProperty({
        description: 'Username of the user',
        example: 'john_doe',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'User biography',
        example: 'A passionate cinephile with a love for classic Hollywood films and indie gems. Always on the lookout for underrated masterpieces!',
        required: false,
    })
    @IsString()
    @IsOptional()
    bio?: string;
}