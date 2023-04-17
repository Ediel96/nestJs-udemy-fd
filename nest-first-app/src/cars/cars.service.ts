import { BadRequestException, Injectable, NotFoundException, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { UpdateCarDto, CreateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },{
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars
    }

    findOneById(id : string){
        const car =  this.cars.find( e =>  e.id === id);
        if(!car) throw new NotFoundException(`car with id ${id} not found` );
        return  car
    }

    create( createCarDto : CreateCarDto) {
        const car = {
            id :uuid(),
            ...createCarDto
        }
        this.cars.push(car)
    }

    update(id : string, updateCarDto :UpdateCarDto){

        let carDB = this.findOneById(id);

        if(updateCarDto.id && updateCarDto.id !== id)
        throw new BadRequestException(`Car id is not valid inside body`);

        this.cars = this.cars.map( car => {

            if( car.id == id){
                carDB = { ...carDB, ...updateCarDto, id }
                return  carDB
            }

            return car

        });

        return this.cars// carro actulizado
    }

    delete(id : string){

        this.findOneById(id);

        this.cars = this.cars.filter(e => e.id !== id)

        return {
            ok : true,
            message : 'se ha eliminado correctamente',
            cars : this.cars
        } 

    }

}
