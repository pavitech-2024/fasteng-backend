import { IsString, IsNotEmpty, IsArray, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CalculateStep3DTO {
  @ApiProperty({ description: 'Banda DNIT', enum: ['A', 'B', 'C'] })
  @IsString()
  @IsNotEmpty()
  dnitBands: 'A' | 'B' | 'C';

  @ApiProperty({ 
    description: 'Lista de agregados', 
    type: [Object]
  })
  @IsArray()
  @IsNotEmpty()
  aggregates: { _id: string; name: string }[];

  @ApiProperty({ 
    description: 'Porcentagens de entrada para cada agregado',
    type: [Object]
  })
  @IsArray()
  @IsNotEmpty()
  percentageInputs: { [key: string]: number }[];

  @ApiProperty({
    description: 'Linhas da tabela com os passantes',
    type: [Object]
  })
  @IsArray()
  @IsNotEmpty()
  tableRows: any[]; 
}
