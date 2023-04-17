import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly serviceCars : CarsService
        ){}

    @Get()
    getAllCars(){ 
        return this.serviceCars.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.serviceCars.findOneById( id );
    }

    @Post()
    createCar( @Body() createcarDto : CreateCarDto ){
        this.serviceCars.create(createcarDto)
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id : string,
        @Body() body : UpdateCarDto) 
        {
            return this.serviceCars.update(id, body)
    }

    @Delete(':id')
    deleteCar(
        @Param('id', ParseUUIDPipe) id : string)
        {
        return this.serviceCars.delete(id);
    }
}
