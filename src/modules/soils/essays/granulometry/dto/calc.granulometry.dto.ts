import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Granulometry } from '../schemas';

export class Calc_GRANULOMETRY_Dto {
  @ApiProperty({
    description: "Dados gerais da granulometria",
    example: {
      material: "Areia Média",
      density: 2.65,
      temperature: 25
    }
  })
  @IsNotEmpty()
  generalData: Granulometry['generalData'];

  @ApiProperty({
    description: "Dados da segunda etapa da granulometria",
    example: {
      sieve_4_75mm: 45.2,
      sieve_2_36mm: 30.8,
      sieve_1_18mm: 15.0,
      sieve_0_6mm: 5.5,
      pan: 3.5
    }
  })
  @IsNotEmpty()
  step2Data: Granulometry['step2Data'];
}

export class Calc_GRANULOMETRY_Out {
  @ApiProperty({
    description: "Valores acumulados retidos em cada peneira",
    example: [5, 15, 30, 45, 60, 100]
  })
  accumulated_retained: number[];

  @ApiProperty({
    description: "Pontos para plotar o gráfico granulométrico",
    example: [[4.75, 95], [2.36, 70], [1.18, 40], [0.6, 20]]
  })
  graph_data: [number, number][];

  @ApiProperty({
    description: "Percentuais passantes",
    example: [95, 70, 40, 20, 0]
  })
  passant: number[];

  @ApiProperty({
    description: "Percentuais retidos",
    example: [5, 25, 30, 20, 20]
  })
  retained_porcentage: number[];

  @ApiProperty({ example: 100 })
  total_retained: number;

  @ApiProperty({ example: 19 })
  nominal_diameter: number;

  @ApiProperty({ example: 12.5 })
  nominal_size: number;

  @ApiProperty({ example: 5.8 })
  fineness_module: number;

  @ApiProperty({ example: 1.2 })
  cc: number;

  @ApiProperty({ example: 3.4 })
  cnu: number;

  @ApiProperty({ example: 0.02 })
  error: number;
}









/*import { IsNotEmpty } from 'class-validator';
import { Granulometry } from '../schemas';

export class Calc_GRANULOMETRY_Dto {
  @IsNotEmpty()
  generalData: Granulometry['generalData'];

  @IsNotEmpty()
  step2Data: Granulometry['step2Data'];
}

export interface Calc_GRANULOMETRY_Out {
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