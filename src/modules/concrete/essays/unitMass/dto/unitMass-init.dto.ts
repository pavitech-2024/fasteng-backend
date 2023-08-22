import { IsNotEmpty } from 'class-validator';
import { Material } from 'modules/concrete/materials/schemas';

export class UnitMassInitDto {
  @IsNotEmpty()
  experimentName: string;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  material: Material;
}
