import { BrandsService } from './../brands/brands.service';
import { CarsService } from './../cars/cars.service';
import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRAND_SEED } from './data/brands.seed';


@Injectable()
export class SeedService {

  constructor(
    private readonly carsService:  CarsService,
    private readonly brandsService : BrandsService,
  ) {}
  
  populateDB() {

    this.carsService.fillCarsWithSeedDate(CARS_SEED);
    this.brandsService.fillBrandsWithSeedDate(BRAND_SEED);

    return 'SEED executed';

  }


}
