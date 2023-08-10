import { Sample } from '../../../samples/schemas';
import { IsNotEmpty } from 'class-validator';

export class SucsInitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sample: Sample;
}
