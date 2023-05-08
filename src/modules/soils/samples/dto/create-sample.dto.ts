import { IsNotEmpty } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  name: string;

  type: 'inorganicSoil' | 'organicSoil' | 'pavementLayer';
  construction?: string;
  snippet?: string;
  provenance?: string;
  stake?: string;
  layer?: string;
  depth?: number; //cm
  exd?: string;
  collectionDate: string;
  description?: string;
}
