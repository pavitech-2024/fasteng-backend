import { IsNotEmpty } from 'class-validator';

export class FwdInitDto {
  @IsNotEmpty()
  name: string;
}
