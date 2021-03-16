import {
  AutoMapper,
  ignore,
  mapFrom,
  Profile,
  ProfileBase,
} from 'nestjsx-automapper';
import { PokemonAddDto } from '../dto/pokemon/pokemon-add.dto';
import { PokemonGetDto } from '../dto/pokemon/pokemon-get.dto';
import { Pokemon } from '../entities/pokemon/pokemon.entity';

@Profile()
export default class PokemonProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();

    mapper.createMap(Pokemon, PokemonGetDto).forMember(
      p => p.pokemon_data,
      mapFrom(p => p.pokemon_data),
    );
    mapper.createMap(PokemonAddDto, Pokemon).forMember(p => p.id, ignore());
  }
}
