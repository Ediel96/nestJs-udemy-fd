import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    }catch(error){
      this.handleExceptions(error);
    }

  }

  findAll(query :  PaginationDto) {

    const {limite = 10, offset = 0} = query;

    return this.pokemonModel.find()
    .limit(limite)
    .skip(offset)
    .sort({
      no:1
    })
    .select('-__v') // - le resta;
  }

  async findOne(term: string) {

    let pokemon : Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no : term})
    }

    //MongoID
    if(!pokemon && isValidObjectId(term) ){
      pokemon = await this.pokemonModel.findById(term)
    }

    //Name
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name : term.toLowerCase().trim() })
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne(updatePokemonDto, {new: true})
      return { ...pokemon.toJSON, ...updatePokemonDto };
    } catch (error) {

      this.handleExceptions(error);
    }
  }

   async remove(term: string) {
    // const pokemon =  await this.findOne(term);
    // await pokemon.deleteOne();
    // const result = await this.pokemonModel.findByIdAndDelete(term);
    // Nota : no utlizar .deleteMany()
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: term});
    if(deletedCount === 0)
      throw new BadRequestException(`Pokemon with id ${term} not found`)
    return `bew removes correctly`;
  }

  private handleExceptions(error : any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Pokemon - Ckeck server logs`)
  }

}
