import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonResponse } from './interfaces/poke-reponse.inteface';


@Injectable()
export class SeedService {

  baseURL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(private readonly httpService: HttpService) {}
  async executedSeed() {
    const { data } = await this.httpService.axiosRef.get<PokemonResponse>(this.baseURL);

    data.results.forEach(({name, url}) => {
        const segments = url.split('/');
        const no : number = +segments[ segments.length - 2 ];
    });

    return data.results;
  }

}
