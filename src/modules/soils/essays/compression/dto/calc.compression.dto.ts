import { IsNotEmpty } from 'class-validator';
import { Compression } from '../schema';

export class Calc_Compression_Dto {
  @IsNotEmpty()
  generalData: Compression['generalData'];

  @IsNotEmpty()
  calculation: Compression['calculation'];
}

export interface Calc_Compression_Out {}
