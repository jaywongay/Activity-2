import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ 
    example: 'My First Note',
    description: 'The title of the note'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: 'This is the content of my note',
    description: 'The content of the note'
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ 
    example: 'default',
    description: 'The color theme of the note',
    default: 'default'
  })
  @IsString()
  @IsOptional()
  color?: string = 'default';
}