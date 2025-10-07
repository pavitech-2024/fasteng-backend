import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AsphaltGranulometry } from "../schemas";

export class Calc_AsphaltGranulometry_Dto {
  @ApiProperty({
    description: "Dados gerais da granulometria",
    example: {
      material: "Asfalto A",
      density: 2.65,
      temperature: 150
    }
  })
  @IsNotEmpty()
  generalData: AsphaltGranulometry['generalData'];

  @ApiProperty({
    description: "Dados da segunda etapa",
    example: {
      sieve_1: 10.5,
      sieve_2: 25.3,
      sieve_3: 40.1
    }
  })
  @IsNotEmpty()
  step2Data: AsphaltGranulometry['step2Data'];

  @ApiPropertyOptional({
    description: "Indica se é método Superpave",
    example: true
  })
  @IsBoolean()
  @IsOptional()
  isSuperpave?: boolean;
}

// Resposta
export class Calc_AsphaltGranulometry_Out {
  @ApiProperty({
    description: "Acumulado retido em cada peneira",
    example: [["Sieve 3/8", 25], ["Sieve No.4", 40]]
  })
  accumulated_retained: [string, number][];

  @ApiProperty({
    description: "Dados para o gráfico",
    example: [[4.75, 60], [2.36, 45]]
  })
  graph_data: [number, number][];

  @ApiProperty({
    description: "Passante em cada peneira",
    example: [["Sieve 3/8", 75], ["Sieve No.4", 60]]
  })
  passant: [string, number][];

  @ApiProperty({
    description: "Porcentagem retida",
    example: [["Sieve 3/8", 25], ["Sieve No.4", 40]]
  })
  retained_porcentage: [string, number][];

  @ApiProperty({
    description: "Porcentagem passante",
    example: [["Sieve 3/8", 75], ["Sieve No.4", 60]]
  })
  passant_porcentage: [string, number][];

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


/*import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import { AsphaltGranulometry } from "../schemas";

export class Calc_AsphaltGranulometry_Dto {
  @IsNotEmpty()
  generalData: AsphaltGranulometry['generalData'];

  @IsNotEmpty()
  step2Data: AsphaltGranulometry['step2Data'];

  @IsBoolean()
  @IsOptional()
  isSuperpave?: boolean;
}


export interface Calc_AsphaltGranulometry_Out {
  accumulated_retained: [string, number][];
  graph_data: [number, number][];
  passant: [string, number][];
  retained_porcentage: [string, number][];
  passant_porcentage: [string, number][];
  total_retained: number;
  nominal_diameter: number;
  nominal_size: number;
  fineness_module: number;
  cc: number;
  cnu: number;
  error: number;
}*/