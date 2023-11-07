import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../materials/schemas';

export class AngularityInitDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    material: Material;
}
