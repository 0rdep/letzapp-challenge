import { Module } from '@nestjs/common';
import { AutomapperModule } from 'nestjsx-automapper';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer/trainer.entity';
import { Pokemon } from './entities/pokemon/pokemon.entity';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './services/trainer.service';
import { PokemonService } from './services/pokemon.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Pokedex from 'pokedex-promise-v2';

import './profiles/trainer.profile';
import './profiles/pokemon.profile';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AutomapperModule.withMapper(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Trainer, Pokemon],
        synchronize: true,
      }),
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    TypeOrmModule.forFeature([Trainer, Pokemon]),
  ],
  controllers: [TrainerController],
  providers: [JwtStrategy, TrainerService, PokemonService, { provide: 'pokedex', useValue: new Pokedex() }],
})
export class AppModule {}
