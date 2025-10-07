import { IsNotEmpty } from 'class-validator';
import { Granulometry } from '../schemas';
import { ApiProperty } from '@nestjs/swagger';

export class Calc_CONCRETEGRANULOMETRY_Dto {
  @ApiProperty({
    description: 'Dados gerais da granulometria (ex: tipo de material, data, massa total etc.)',
    example: {
      material: 'Brita 1',
      date: '2025-10-07',
      total_weight: 1200,
      operator: 'Maria Clara',
    },
  })
  @IsNotEmpty()
  generalData: Record<string, any>;

  @ApiProperty({
    description: 'Dados da segunda etapa do ensaio (ex: peneiras e massas retidas)',
    example: {
      sieves: [9.5, 4.8, 2.4, 1.2, 0.6],
      retained_weights: [150, 320, 400, 250, 80],
    },
  })
  @IsNotEmpty()
  step2Data: Record<string, any>;
}

export interface Calc_CONCRETEGRANULOMETRY_Out {
  accumulated_retained: number[];
  graph_data: [number, number][];
  passant: number[];
  retained_porcentage: number[];
  total_retained: number;
  nominal_diameter: number;
  nominal_size: number;
  fineness_module: number;
  cc: number;
  cnu: number;
  error: number;
}







/*import { IsNotEmpty } from 'class-validator';
import { Granulometry } from '../schemas';

export class Calc_CONCRETEGRANULOMETRY_Dto {
  @IsNotEmpty()
  generalData: Granulometry['generalData'];

  @IsNotEmpty()
  step2Data: Granulometry['step2Data'];
}

export interface Calc_CONCRETEGRANULOMETRY_Out {
  accumulated_retained: number[];
  graph_data: [number, number][];
  passant: number[];
  retained_porcentage: number[];
  total_retained: number;
  nominal_diameter: number;
  nominal_size: number;
  fineness_module: number;
  cc: number;
  cnu: number;
  error: number;
}*/