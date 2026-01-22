import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Marshall } from "../schemas";

export class MarshallInitDto {
  @ApiPropertyOptional({
    description: 'ID opcional do Marshall',
    example: '507f1f77bcf86cd799439011'
  })
  @IsOptional()
  @IsString()
  _id?: string

  @ApiProperty({
    description: 'Dados gerais do Marshall',
    type: 'object',
    example: {
      nome: "Marshall Exemplo",
      descricao: "Dosagem Marshall para teste",
    }
  })
  @IsNotEmpty()
  generalData: Marshall['generalData']
}







/*import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Marshall } from "../schemas";

export class MarshallInitDto {

    @IsOptional()
    @IsString()
    _id?: string

    @IsNotEmpty()
    generalData: Marshall['generalData']
}*/