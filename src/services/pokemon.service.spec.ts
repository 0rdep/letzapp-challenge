import { Test, TestingModule } from '@nestjs/testing';
import { createConnection, getConnection, getRepository, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AutoMapper, AutomapperModule, getMapperToken } from 'nestjsx-automapper';
import { Pokemon } from '../entities/pokemon/pokemon.entity';
import { Trainer } from '../entities/trainer/trainer.entity';
import { PokemonService } from './pokemon.service';
import PokemonProfile from '../profiles/pokemon.profile';
import TrainerProfile from '../profiles/trainer.profile';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

const TRAINER_ENTITY: Trainer = {
  id: undefined,
  email: 'example@test.com',
  first_name: 'first_name',
  last_name: 'last',
  nickname: 'nickname',
  password: '12345',
  team: 'team1',
  pokemons: [],
};

const POKEMON_ENTITY: Pokemon = {
  id: undefined,
  name: 'pokemon',
  level: 1,
  pokemon_data: {},
  trainer: undefined,
};

describe('PokemonService', () => {
  let service: PokemonService;
  let trainerRepository: Repository<Trainer>;
  let pokemonRepository: Repository<Pokemon>;

  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [Trainer, Pokemon],
      synchronize: true,
      dropSchema: true,
    });

    trainerRepository = getRepository(Trainer);
    pokemonRepository = getRepository(Pokemon);

    const mapper = new AutoMapper();
    new PokemonProfile(mapper);
    new TrainerProfile(mapper);

    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule.withMapper()],
      providers: [
        PokemonService,
        { provide: getMapperToken(), useValue: mapper },
        { provide: getRepositoryToken(Trainer), useValue: trainerRepository },
        { provide: getRepositoryToken(Pokemon), useValue: pokemonRepository },
        { provide: 'pokedex', useValue: { getPokemonByName: () => ({}) } },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should add a pokemon to database', async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);
    await service.addPokemon(trainer.id, {
      level: 10,
      name: 'pokemon',
      pokemon_id: 32,
    });

    return expect(pokemonRepository.count()).resolves.toEqual(1);
  });

  it("Should return Forbidden if when adding a pokemon and trainer don't exist on database", async () => {
    const addPromise = service.addPokemon(-1, {
      level: 10,
      name: 'pokemon',
      pokemon_id: 32,
    });

    return expect(addPromise).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('Should return all pokemons from specific trainer from database', async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);
    await pokemonRepository.save(pokemonRepository.create({ ...POKEMON_ENTITY, trainer }));
    await pokemonRepository.save(pokemonRepository.create({ ...POKEMON_ENTITY, trainer }));

    return expect(service.getAllPokemons(trainer.id)).resolves.toHaveLength(2);
  });

  it('Should return specific pokemon from specific trainer from database', async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);
    const pokemon = await pokemonRepository.save(pokemonRepository.create({ ...POKEMON_ENTITY, trainer }));

    return expect(service.getPokemon(trainer.id, pokemon.id)).resolves.toHaveProperty('id', pokemon.id);
  });

  it("Should return NotFound if trainer don't have a pokemon with specified id", async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);

    return expect(service.getPokemon(trainer.id, 2)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('Should remove a pokemon from specific trainer from database', async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);
    const pokemon = await pokemonRepository.save(pokemonRepository.create({ ...POKEMON_ENTITY, trainer }));
    await service.removePokemon(trainer.id, pokemon.id);

    return expect(pokemonRepository.find()).resolves.toHaveLength(0);
  });

  it("Should return NotFound if when removing a pokemon that don't exist on database", async () => {
    const trainer = await trainerRepository.save(TRAINER_ENTITY);
    const removePromise = service.removePokemon(trainer.id, 1);

    return expect(removePromise).rejects.toBeInstanceOf(NotFoundException);
  });

  it("Should return Forbidden if when removing a pokemon and trainer don't exist on database", async () => {
    const removePromise = service.removePokemon(1, 1);
    return expect(removePromise).rejects.toBeInstanceOf(ForbiddenException);
  });
});
