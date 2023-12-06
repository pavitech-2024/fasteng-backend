import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/concrete/materials/schemas';

export class UnitMass_Init_Dto {
  @IsNotEmpty()
  experimentName: string;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  material: Material;
}
