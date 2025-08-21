import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class TableRowDTO {
  @ApiProperty({ example: 'Sieve 3/8"' })
  @IsString()
  sieve_label: string;

  @ApiProperty({ example: 'row123' })
  @IsString()
  _id: string;

  @ApiProperty({ example: '95%' })
  @IsString()
  total_passant: string;

  @ApiProperty({ example: '5%' })
  @IsString()
  passant: string;
}

export class TableDataDTO {
  @ApiProperty({ type: [TableRowDTO] })
  @IsArray()
  table_rows: TableRowDTO[];
}

export class GranulometryCompositionDataDTO {
  @ApiProperty({ type: [TableDataDTO] })
  @IsArray()
  table_data: TableDataDTO[];

  @ApiProperty({ type: [Object] })
  @IsArray()
  percentageInputs: { [key: string]: number }[];

  @ApiProperty({ type: [Number] })
  @IsArray()
  sumOfPercents: number[];

  @ApiProperty({ type: Object })
  dnitBands: {
    higher: [string, number][];
    lower: [string, number][];
  };

  @ApiProperty({ type: [Object] })
  @IsArray()
  pointsOfCurve: any[];

  @ApiProperty({ type: [Object] })
  @IsArray()
  percentsOfMaterials: any[];

  @ApiProperty({ type: [Object] })
  @IsArray()
  graphData: any[];

  @ApiProperty({ example: 'Composição Granulométrica' })
  @IsString()
  name: string;
}
