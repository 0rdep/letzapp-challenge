import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message: string;

  @ApiProperty()
  error: string;
}
