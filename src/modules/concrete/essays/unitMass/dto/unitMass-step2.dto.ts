import { IsNotEmpty } from 'class-validator';

export class UnitMass_Step2_Dto {
  @IsNotEmpty()
  containerVolume: number;

  @IsNotEmpty()
  containerWeight: number;

  @IsNotEmpty()
  sampleContainerWeight: number;
}
