import { IsNotEmpty } from 'class-validator';
import { Sample } from '../../../samples/schemas';

export class HrbInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}
