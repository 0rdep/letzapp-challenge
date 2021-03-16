import { IsEmail, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class TrainerAuthenticateDto {
  @ApiProperty()
  @IsEmail()
  @AutoMap()
  email: string;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  password: string;
}
