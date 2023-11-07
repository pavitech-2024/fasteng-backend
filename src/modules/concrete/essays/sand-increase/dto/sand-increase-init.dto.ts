import { Material } from '../../../../../modules/concrete/materials/schemas';
import { IsNotEmpty } from 'class-validator';

export class SandIncreaseInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}