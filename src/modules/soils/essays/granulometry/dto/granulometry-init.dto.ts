import { Sample } from '../../../samples/schemas';
import { IsNotEmpty } from 'class-validator';

export class GranulometryInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}