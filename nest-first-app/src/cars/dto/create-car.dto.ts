import { IsString, MinLength, minLength } from "class-validator";

export class CreateCarDto {

    @IsString({message:`the bran most be a cool string`})
    readonly brand : string;
    
    @IsString()
    @MinLength(3)
    readonly model : string;
}