import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class Calc_Superpave_GranulometyEssay_Dto {
  @IsNotEmpty()
  @IsNumber()
  material_mass: number;

  @IsNotEmpty()
  @IsArray()
  table_data: 
  { sieve_label: string; 
    sieve_value: number; 
    passant: number; 
    retained: number 
  }[];

  @IsNotEmpty()
  @IsNumber()
  bottom: number;
}
