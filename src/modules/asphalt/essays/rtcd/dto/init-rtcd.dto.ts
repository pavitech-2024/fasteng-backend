import { IsNotEmpty } from 'class-validator';
import { Material } from '../../../../../modules/asphalt/materials/schemas';

export class RtcdInitDto {
  @IsNotEmpty()
  name: string;
}
