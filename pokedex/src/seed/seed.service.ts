import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonResponse } from './interfaces/poke-reponse.inteface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(
    private readonly httpService: HttpService,
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>) {}


    async executedSeed() {
    const { data } = await this.httpService.axiosRef.get<PokemonResponse>(this.baseURL);

    const insertPromisesArray = [];

    data.results.forEach( async ({name, url}) => {
        const segments = url.split('/');
        const no : number = +segments[ segments.length - 2 ];
        this.pokemonModel.create({name, no});
    });

    return data.results;
  }

}
