import { Sample } from '../../../samples/schemas';
import { IsNotEmpty } from 'class-validator';

export class SoilsGranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}