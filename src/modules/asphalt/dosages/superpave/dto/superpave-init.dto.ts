import { IsNotEmpty } from 'class-validator';

export class SuperpaveInitDto {
  @IsNotEmpty()
  name: string;
}
