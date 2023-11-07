import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/concrete/materials/schemas';

export class ConcreteGranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}