import { AutoMap } from 'nestjsx-automapper';
import { Pokemon } from '../../entities/pokemon/pokemon.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonGetDto {
  @AutoMap()
  @ApiProperty()
  id: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  level: string;

  @AutoMap()
  @ApiProperty({ type: Pokemon })
  pokemon_data: Pokemon;
}
