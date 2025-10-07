import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Calc_ViscosityRotational_Dto {
  @ApiProperty({
    description: 'Dados gerais do ensaio de viscosidade rotacional',
    example: {
      operator: 'Maria Clara',
      date: '2025-10-07',
      equipment: 'Brookfield DV-II+ Pro',
      sampleMass: 500,
    },
  })
  @IsNotEmpty()
  generalData: Record<string, any>;

  @ApiProperty({
    description: 'Dados específicos de viscosidade rotacional',
    example: {
      temperatures: [135, 145, 155, 165, 175],
      viscosities: [450, 380, 310, 260, 220],
      spindleSpeed: 20,
    },
  })
  @IsNotEmpty()
  viscosityRotational: Record<string, any>;
}

export class Calc_ViscosityRotational_Out {
  @ApiProperty({
    description: 'Gráfico gerado (base64 ou URL)',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
  })
  graph: string;

  @ApiProperty({
    description: 'Faixa de temperatura de usinagem',
    example: { higher: 170, lower: 150, average: 160 },
  })
  machiningTemperatureRange: { higher: number; lower: number; average: number };

  @ApiProperty({
    description: 'Faixa de temperatura de compactação',
    example: { higher: 160, lower: 140, average: 150 },
  })
  compressionTemperatureRange: { higher: number; lower: number; average: number };

  @ApiProperty({
    description: 'Faixa de temperatura do agregado',
    example: { higher: 180, lower: 160, average: 170 },
  })
  aggregateTemperatureRange: { higher: number; lower: number; average: number };

  @ApiProperty({
    description: 'Pontos da curva de viscosidade',
    example: [
      [135, 450],
      [145, 380],
      [155, 310],
      [165, 260],
      [175, 220],
    ],
  })
  curvePoints: number[][];

  @ApiProperty({
    description: 'Equação da curva de viscosidade',
    example: { aIndex: 12000, bIndex: -3.2 },
  })
  equation: { aIndex: number; bIndex: number };
}









/*import { IsNotEmpty } from 'class-validator';
import { ViscosityRotational } from '../schemas';

export class Calc_ViscosityRotational_Dto {
  @IsNotEmpty()
  generalData: ViscosityRotational['generalData'];

  @IsNotEmpty()
  viscosityRotational: ViscosityRotational['viscosityRotational'];
}

export interface Calc_ViscosityRotational_Out {
  graph: string;
  machiningTemperatureRange: {
    higher: number;
    lower: number;
    average: number;
  };
  compressionTemperatureRange: {
    higher: number;
    lower: number;
    average: number;
  };
  aggregateTemperatureRange: {
    higher: number;
    lower: number;
    average: number;
  };
  curvePoints: number[][];
  equation: {
    aIndex: number;
    bIndex: number;
  };
}
*/