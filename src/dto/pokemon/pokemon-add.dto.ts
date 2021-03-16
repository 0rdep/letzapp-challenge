import {
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { AutoMap } from '@nartc/automapper';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonAddDto {
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsPositive()
  @AutoMap()
  @ApiProperty()
  level: number;

  @IsInt()
  @IsPositive()
  @AutoMap()
  @ApiProperty()
  pokemon_id: number;
}
