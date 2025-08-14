import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSampleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

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
