import {
  AutoMapper,
  ignore,
  mapFrom,
  Profile,
  ProfileBase,
} from 'nestjsx-automapper';
import { TrainerCreateDto } from '../dto/trainer/trainer-create.dto';
import { TrainerGetDto } from '../dto/trainer/trainer-get.dto';
import { Trainer } from '../entities/trainer/trainer.entity';

@Profile()
export default class TrainerProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
      .createMap(TrainerCreateDto, Trainer)
      .forMember(t => t.id, ignore())
      .forMember(
        t => t.first_name,
        mapFrom(t => t.first_name),
      )
      .forMember(
        t => t.last_name,
        mapFrom(t => t.last_name),
      );

    mapper
      .createMap(Trainer, TrainerGetDto)
      .forMember(
        t => t.pokemons_owned,
        mapFrom(t => t.pokemons?.length || 0),
      )
      .forMember(
        t => t.first_name,
        mapFrom(t => t.first_name),
      )
      .forMember(
        t => t.last_name,
        mapFrom(t => t.last_name),
      );
  }
}
