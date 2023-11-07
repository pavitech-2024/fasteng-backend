import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class ShapeIndexInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}
