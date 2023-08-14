import { Material } from 'modules/concrete/materials/schemas';
import { IsNotEmpty } from 'class-validator';

export class SandSwellingInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}