import { IsEmail, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class TrainerCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  nickname: string;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  first_name: string;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @AutoMap()
  @ApiProperty({example: 'example@test.com'})
  email: string;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  team: string;
}
