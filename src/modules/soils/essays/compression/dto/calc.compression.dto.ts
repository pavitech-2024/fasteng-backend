import { IsNotEmpty } from 'class-validator';
import { Compression } from '../schema';

export class Calc_Compression_Dto {
  @IsNotEmpty()
  generalData: Compression['generalData'];

  @IsNotEmpty()
  hygroscopicData: Compression['hygroscopicData'];

  @IsNotEmpty()
  humidityDeterminationData: Compression['humidityDeterminationData'];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Calc_Compression_Out {}
