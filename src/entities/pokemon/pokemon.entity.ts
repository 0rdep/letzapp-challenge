import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@nartc/automapper';
import { Trainer } from '../trainer/trainer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { JsonStringTransformer } from '../../transformations/json-string.transformer';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  level: number;

  @Column({ type: 'varchar', transformer: new JsonStringTransformer() })
  pokemon_data: Record<string, any>;

  @ManyToOne(
    () => Trainer,
    t => t.pokemons,
  )
  trainer: Trainer | number;
}

export class Ability2 {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class Ability {
  @ApiProperty()
  ability: Ability2;

  @ApiProperty()
  is_hidden: boolean;

  @ApiProperty()
  slot: number;
}

export class Form {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class Version {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class GameIndice {
  @ApiProperty()
  game_index: number;

  @ApiProperty()
  version: Version;
}

export class Item {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class Version2 {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class VersionDetail {
  @ApiProperty()
  rarity: number;

  @ApiProperty()
  version: Version2;
}

export class HeldItem {
  @ApiProperty()
  item: Item;

  @ApiProperty()
  version_details: VersionDetail[];
}

export class Move2 {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class MoveLearnMethod {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class VersionGroup {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class VersionGroupDetail {
  @ApiProperty()
  level_learned_at: number;

  @ApiProperty()
  move_learn_method: MoveLearnMethod;

  @ApiProperty()
  version_group: VersionGroup;
}

export class Move {
  @ApiProperty()
  move: Move2;

  @ApiProperty()
  version_group_details: VersionGroupDetail[];
}

export class Species {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class DreamWorld {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;
}

export class OfficialArtwork {
  @ApiProperty()
  front_default: string;
}

export class Other {
  @ApiProperty()
  dream_world: DreamWorld;

  @ApiProperty()
  'official-artwork': OfficialArtwork;
}

export class RedBlue {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_gray: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_gray: string;
}

export class Yellow {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_gray: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_gray: string;
}

export class GenerationI {
  @ApiProperty()
  'red-blue': RedBlue;

  @ApiProperty()
  yellow: Yellow;
}

export class Crystal {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class Gold {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class Silver {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class GenerationIi {
  @ApiProperty()
  crystal: Crystal;

  @ApiProperty()
  gold: Gold;

  @ApiProperty()
  silver: Silver;
}

export class Emerald {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class FireredLeafgreen {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class RubySapphire {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_shiny: string;
}

export class GenerationIii {
  @ApiProperty()
  emerald: Emerald;

  @ApiProperty()
  'firered-leafgreen': FireredLeafgreen;

  @ApiProperty()
  'ruby-sapphire': RubySapphire;
}

export class DiamondPearl {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class HeartgoldSoulsilver {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class Platinum {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class GenerationIv {
  @ApiProperty()
  'diamond-pearl': DiamondPearl;

  @ApiProperty()
  'heartgold-soulsilver': HeartgoldSoulsilver;

  @ApiProperty()
  platinum: Platinum;
}

export class Animated {
  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class BlackWhite {
  @ApiProperty()
  animated: Animated;

  @ApiProperty()
  back_default: string;

  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class GenerationV {
  @ApiProperty()
  'black-white': BlackWhite;
}

export class OmegarubyAlphasapphire {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class XY {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class GenerationVi {
  @ApiProperty()
  'omegaruby-alphasapphire': OmegarubyAlphasapphire;

  @ApiProperty()
  'x-y': XY;
}

export class Icons {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;
}

export class UltraSunUltraMoon {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;
}

export class GenerationVii {
  @ApiProperty()
  icons: Icons;

  @ApiProperty()
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
}

export class Icons2 {
  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;
}

export class GenerationViii {
  @ApiProperty()
  icons: Icons2;
}

export class Versions {
  @ApiProperty()
  'generation-i': GenerationI;

  @ApiProperty()
  'generation-ii': GenerationIi;

  @ApiProperty()
  'generation-iii': GenerationIii;

  @ApiProperty()
  'generation-iv': GenerationIv;

  @ApiProperty()
  'generation-v': GenerationV;

  @ApiProperty()
  'generation-vi': GenerationVi;

  @ApiProperty()
  'generation-vii': GenerationVii;

  @ApiProperty()
  'generation-viii': GenerationViii;
}

export class Sprites {
  back_default: string;
  @ApiProperty()
  back_female?: any;

  @ApiProperty()
  back_shiny: string;

  @ApiProperty()
  back_shiny_female?: any;

  @ApiProperty()
  front_default: string;

  @ApiProperty()
  front_female?: any;

  @ApiProperty()
  front_shiny: string;

  @ApiProperty()
  front_shiny_female?: any;

  @ApiProperty()
  other: Other;

  @ApiProperty()
  versions: Versions;
}

export class Stat2 {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class Stat {
  @ApiProperty()
  base_stat: number;

  @ApiProperty()
  effort: number;

  @ApiProperty()
  stat: Stat2;
}

export class Type2 {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}

export class Type {
  @ApiProperty()
  slot: number;

  @ApiProperty()
  type: Type2;
}

export class PokemonData {
  @ApiProperty()
  abilities: Ability[];

  @ApiProperty()
  base_experience: number;

  @ApiProperty()
  forms: Form[];

  @ApiProperty()
  game_indices: GameIndice[];

  @ApiProperty()
  height: number;

  @ApiProperty()
  held_items: HeldItem[];

  @ApiProperty()
  id: number;

  @ApiProperty()
  is_default: boolean;

  @ApiProperty()
  location_area_encounters: string;

  @ApiProperty()
  moves: Move[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  past_types: any[];

  @ApiProperty()
  species: Species;

  @ApiProperty()
  sprites: Sprites;

  @ApiProperty()
  stats: Stat[];

  @ApiProperty()
  types: Type[];

  @ApiProperty()
  weight: number;
}
