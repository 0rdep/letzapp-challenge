import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { Repository } from 'typeorm';
import { PokemonAddDto } from '../dto/pokemon/pokemon-add.dto';
import { PokemonGetDto } from '../dto/pokemon/pokemon-get.dto';
import { Pokemon } from '../entities/pokemon/pokemon.entity';
import { Trainer } from '../entities/trainer/trainer.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectMapper()
    private readonly mapper: AutoMapper,
    @Inject('pokedex')
    private readonly pokedex: any,
  ) {}

  async getAllPokemons(trainerId: number) {
    const pokemons = await this.pokemonRepository.find({
      where: { trainer: trainerId },
    });

    return this.mapper.mapArray(pokemons, PokemonGetDto, Pokemon);
  }

  async getPokemon(trainerId: number, pokemonId: number) {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id: pokemonId, trainer: trainerId },
    });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return this.mapper.map(pokemon, PokemonGetDto, Pokemon);
  }

  async addPokemon(trainerId: number, dto: PokemonAddDto) {
    const trainer = await this.trainerRepository.findOne(trainerId);

    if (!trainer) {
      throw new ForbiddenException('Trainer not found');
    }

    const entity = this.mapper.map(dto, Pokemon, PokemonAddDto);

    const pokemon_data = await this.pokedex.getPokemonByName(dto.pokemon_id);
    if (!pokemon_data) {
      throw new BadRequestException('Pokemon not found, invalid pokemon id');
    }

    entity.pokemon_data = pokemon_data;
    entity.trainer = trainer.id;

    const newEntity = await this.pokemonRepository.save(entity);
    return this.mapper.map(newEntity, PokemonGetDto, Pokemon);
  }

  async removePokemon(trainerId: number, pokemonId: number) {
    const trainer = await this.trainerRepository.findOne(trainerId);

    if (!trainer) {
      throw new ForbiddenException('Trainer not found');
    }

    const pokemon = await this.pokemonRepository.findOne({
      where: {
        id: pokemonId,
        trainer: trainer,
      },
    });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    await this.pokemonRepository.delete(pokemon);
  }
}
