import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class FlashPointInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  material: Material;
}
