import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@nartc/automapper';
import { Pokemon } from '../pokemon/pokemon.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  nickname: string;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap()
  first_name: string;

  @Column()
  @AutoMap()
  last_name: string;

  @Column()
  @AutoMap()
  team: string;

  @OneToMany(
    () => Pokemon,
    p => p.trainer,
  )
  pokemons: Pokemon[] | number[];
}
