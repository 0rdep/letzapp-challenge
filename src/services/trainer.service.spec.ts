import { Test, TestingModule } from '@nestjs/testing';
import { TrainerService } from './trainer.service';
import { Trainer } from '../entities/trainer/trainer.entity';
import { JwtService } from '@nestjs/jwt';
import { createConnection, getConnection, getRepository, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from '../entities/pokemon/pokemon.entity';
import { AutoMapper, AutomapperModule, getMapperToken } from 'nestjsx-automapper';
import PokemonProfile from '../profiles/pokemon.profile';
import TrainerProfile from '../profiles/trainer.profile';
import { hash } from '../auth/crypt-utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const JWT_TOKEN = 'token';
const MOCKED_JWT_SERVICE = {
  sign: () => JWT_TOKEN,
};

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

describe('TrainerController', () => {
  let service: TrainerService;
  let repository: Repository<Trainer>;

  beforeEach(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [Trainer, Pokemon],
      synchronize: true,
      dropSchema: true,
    });

    repository = getRepository(Trainer);

    const mapper = new AutoMapper();
    new PokemonProfile(mapper);
    new TrainerProfile(mapper);

    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule.withMapper()],
      providers: [
        TrainerService,
        { provide: getMapperToken(), useValue: mapper },
        { provide: getRepositoryToken(Trainer), useValue: repository },
        { provide: JwtService, useValue: MOCKED_JWT_SERVICE },
      ],
    }).compile();

    service = module.get<TrainerService>(TrainerService);
  });

  afterEach(async () => {
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should add a trainer to database', async () => {
    await service.create({
      email: 'example@test.com',
      first_name: 'first_name',
      last_name: 'last',
      nickname: 'nickname',
      password: '12345',
      team: 'team1',
    });

    return expect(repository.count()).resolves.toEqual(1);
  });

  it('Should not create trainer if email already in use', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));

    const createPromise = service.create({
      email: TRAINER_ENTITY.email,
      first_name: 'a',
      last_name: 'a',
      nickname: 'a',
      password: 'a',
      team: 'a',
    });

    return expect(createPromise).rejects.toBeInstanceOf(BadRequestException);
  });

  it('Should return all trainers from database', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));
    await repository.save(repository.create(TRAINER_ENTITY));

    return expect(service.findAll()).resolves.toHaveLength(2);
  });

  it('Should return all trainers by nickname', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));

    return expect(service.findAll(TRAINER_ENTITY.nickname)).resolves.toHaveLength(1);
  });

  it('Should return all trainers if nickname contains string', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));

    return expect(service.findAll(null, 'nick')).resolves.toHaveLength(1);
  });

  it('Should return all trainers skipping 1', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));
    await repository.save(repository.create(TRAINER_ENTITY));

    return expect(service.findAll(null, null, 1)).resolves.toHaveLength(1);
  });

  it('Should return all trainers taking 1', async () => {
    await repository.save(repository.create(TRAINER_ENTITY));
    await repository.save(repository.create(TRAINER_ENTITY));

    return expect(service.findAll(null, null, null, 1)).resolves.toHaveLength(1);
  });

  it('Should return specific trainer from database', async () => {
    const trainer = await repository.save(TRAINER_ENTITY);

    return expect(service.findOne(trainer.id)).resolves.toHaveProperty('id', trainer.id);
  });

  it("Should return NotFound if specific trainer don't exist on database", async () => {
    return expect(service.findOne(1)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('Should authenticate user', async () => {
    await repository.save({ ...TRAINER_ENTITY, password: await hash(TRAINER_ENTITY.password) });

    const authenticateBody = { email: TRAINER_ENTITY.email, password: TRAINER_ENTITY.password };

    return expect(service.authenticate(authenticateBody)).resolves.toHaveProperty('token', JWT_TOKEN);
  });
});
