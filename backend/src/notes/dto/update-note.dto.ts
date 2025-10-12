import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiPropertyOptional({ 
    example: 'Updated Note Title',
    description: 'The title of the note'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ 
    example: 'Updated content',
    description: 'The content of the note'
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ 
    example: 'blue',
    description: 'The color theme of the note'
  })
  @IsString()
  @IsOptional()
  color?: string;
}