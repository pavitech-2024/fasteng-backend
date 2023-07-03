import { Sample } from '../../../samples/schemas';
import { IsNotEmpty } from 'class-validator';

export class CbrInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}
