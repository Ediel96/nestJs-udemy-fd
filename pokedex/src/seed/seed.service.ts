import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonResponse } from './interfaces/poke-reponse.inteface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=1000';

  constructor(
    private readonly httpService: HttpService,
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>) {}


    async executedSeed() {
    const { data } = await this.httpService.axiosRef.get<PokemonResponse>(this.baseURL);

    //Eliminar todo pero esto no se debe de hacer en la proyecto real
    await this.pokemonModel.deleteMany({});

    const insertPromisesArray = [];

    data.results.forEach(  ({name, url}) => {
        const segments = url.split('/');
        const no : number = +segments[ segments.length - 2 ];

        //const pokemon = await this.pokemonModel.create({name, no});

        insertPromisesArray.push(
          this.pokemonModel.create({name, no})
        );
    });

    await Promise.all(insertPromisesArray)

    return data.results;
  }

}
