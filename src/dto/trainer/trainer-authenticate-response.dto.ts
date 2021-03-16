import { ApiProperty } from '@nestjs/swagger';

export class TrainerAuthenticateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  token: string;
}
