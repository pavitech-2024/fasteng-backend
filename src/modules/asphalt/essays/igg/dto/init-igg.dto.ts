import { IsNotEmpty } from 'class-validator';

export class IggInitDto {
  @IsNotEmpty()
  name: string;
}
