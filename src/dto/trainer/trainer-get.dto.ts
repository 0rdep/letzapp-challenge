import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from '@nestjs/swagger';

export class TrainerGetDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  nickname: string;

  @AutoMap()
  @ApiProperty()
  first_name: string;

  @AutoMap()
  @ApiProperty()
  last_name: string;

  @AutoMap()
  @ApiProperty()
  team: string;
  
  @ApiProperty()
  pokemons_owned: number;
}
