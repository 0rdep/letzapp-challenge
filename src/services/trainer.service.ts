import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Trainer } from '../entities/trainer/trainer.entity';
import { JwtService } from '@nestjs/jwt';
import { TrainerAuthenticateResponseDto } from '../dto/trainer/trainer-authenticate-response.dto';
import { TrainerCreateDto } from '../dto/trainer/trainer-create.dto';
import { TrainerGetDto } from '../dto/trainer/trainer-get.dto';
import { TrainerAuthenticateDto } from '../dto/trainer/trainer-authenticate.dto';
import { compare, hash } from '../auth/crypt-utils';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly trainerRepository: Repository<Trainer>,
    @InjectMapper()
    private readonly mapper: AutoMapper,
    private readonly jwtService: JwtService,
  ) {}

  async create(createTrainerDto: TrainerCreateDto) {
    const entity = this.mapper.map(createTrainerDto, Trainer, TrainerCreateDto);

    const emailExists =
      (await this.trainerRepository.count({
        where: { email: entity.email },
      })) > 0;

    if (emailExists) {
      throw new BadRequestException('Email already in use');
    }

    entity.password = await hash(entity.password);

    const createdEntity = await this.trainerRepository.save(entity);
    return this.mapper.map(createdEntity, TrainerGetDto, Trainer);
  }

  async findAll(nickname?: string, nicknameContains?: string, skip = 0, take = 10) {
    const options: FindManyOptions<Trainer> = {
      relations: ['pokemons'],
      skip,
      take,
    };

    if (nickname) {
      options.where = { nickname };
    }

    if (nicknameContains) {
      options.where = { nickname: ILike(`%${nicknameContains}%`) };
    }

    const trainers = await this.trainerRepository.find(options);
    return this.mapper.mapArray(trainers, TrainerGetDto, Trainer);
  }

  async findOne(id: number) {
    const entity = await this.trainerRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!entity) {
      throw new NotFoundException('Trainer not found');
    }

    return this.mapper.map(entity, TrainerGetDto, Trainer);
  }

  async authenticate(authenticateTrainerDto: TrainerAuthenticateDto): Promise<TrainerAuthenticateResponseDto> {
    const entity = await this.trainerRepository.findOne({
      where: { email: authenticateTrainerDto.email },
    });

    if (!entity) {
      throw new BadRequestException('Email or Password is invalid!');
    }

    const validPassword = await compare(authenticateTrainerDto.password, entity.password);

    if (!validPassword) {
      throw new BadRequestException('Email or Password is invalid!');
    }

    return {
      id: entity.id,
      token: this.jwtService.sign({ sub: entity.id }),
    };
  }
}
