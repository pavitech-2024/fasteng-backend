import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class ElongatedParticlesInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}
