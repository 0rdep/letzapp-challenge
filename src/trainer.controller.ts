import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TrainerService } from './services/trainer.service';
import { PokemonAddDto } from './dto/pokemon/pokemon-add.dto';
import { TrainerAuthenticateDto } from './dto/trainer/trainer-authenticate.dto';
import { TrainerCreateDto } from './dto/trainer/trainer-create.dto';
import { JwtGuard } from './guards/jwt.guard';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TrainerGetDto } from './dto/trainer/trainer-get.dto';
import { TrainerAuthenticateResponseDto } from './dto/trainer/trainer-authenticate-response.dto';
import { PokemonGetDto } from './dto/pokemon/pokemon-get.dto';
import { PokemonService } from './services/pokemon.service';
import { TokenMatchUserGuard } from './guards/token-match-user.guard';
import ErrorDto from './dto/error.dto';

@Controller('trainer')
@ApiTags('Trainer')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService, private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiCreatedResponse({ type: TrainerGetDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  create(@Body() createTrainerDto: TrainerCreateDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  @ApiOkResponse({ type: TrainerGetDto, isArray: true })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  @ApiQuery({ required: false, name: 'nickname' })
  @ApiQuery({ required: false, name: 'nicknameContains' })
  @ApiQuery({ required: false, name: 'skip', example: 0 })
  @ApiQuery({ required: false, name: 'take', example: 10 })
  findAll(
    @Query('nickname') nickname?: string,
    @Query('nicknameContains') nicknameContains?: string,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('take', ParseIntPipe) take?: number,
  ) {
    return this.trainerService.findAll(nickname, nicknameContains, skip, take);
  }

  @Get(':trainerId')
  @ApiOkResponse({ type: TrainerGetDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  findOne(@Param('trainerId', ParseIntPipe) trainerId: number) {
    return this.trainerService.findOne(trainerId);
  }

  @Post('authenticate')
  @ApiOkResponse({ type: TrainerAuthenticateResponseDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  authenticate(@Body() body: TrainerAuthenticateDto) {
    return this.trainerService.authenticate(body);
  }

  @Post(':trainerId/pokemon')
  @UseGuards(JwtGuard, TokenMatchUserGuard)
  @ApiCreatedResponse({ type: PokemonGetDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  @ApiBearerAuth()
  addPokemon(@Param('trainerId', ParseIntPipe) trainerId: number, @Body() body: PokemonAddDto) {
    return this.pokemonService.addPokemon(trainerId, body);
  }

  @Get(':trainerId/pokemon')
  @ApiOkResponse({ type: PokemonGetDto, isArray: true })
  @ApiBadRequestResponse({ type: ErrorDto })
  @ApiForbiddenResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  getAllPokemons(@Param('trainerId', ParseIntPipe) trainerId: number) {
    return this.pokemonService.getAllPokemons(trainerId);
  }

  @Get(':trainerId/pokemon/:pokemonId')
  @ApiOkResponse({ type: PokemonGetDto })
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  getPokemon(@Param('trainerId', ParseIntPipe) trainerId: number, @Param('pokemonId', ParseIntPipe) pokemonId: number) {
    return this.pokemonService.getPokemon(trainerId, pokemonId);
  }

  @Delete(':trainerId/pokemon/:pokemonId')
  @UseGuards(JwtGuard, TokenMatchUserGuard)
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ErrorDto })
  @ApiInternalServerErrorResponse({ type: ErrorDto })
  @HttpCode(204)
  @ApiBearerAuth()
  removePokemon(
    @Param('trainerId', ParseIntPipe) trainerId: number,
    @Param('pokemonId', ParseIntPipe) pokemonId: number,
  ) {
    return this.pokemonService.removePokemon(trainerId, pokemonId);
  }
}
