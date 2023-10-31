import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class DuctilityInitDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    material: Material;
}
