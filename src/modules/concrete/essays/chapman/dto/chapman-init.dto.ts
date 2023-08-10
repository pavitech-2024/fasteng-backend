import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class ChapmanInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}
