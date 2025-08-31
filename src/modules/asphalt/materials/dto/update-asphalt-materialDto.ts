// update-asphalt-material.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateAsphaltMaterialDto, DescriptionDto } from './create-asphalt-material.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAsphaltMaterialDto extends PartialType(CreateAsphaltMaterialDto) {
  @ApiPropertyOptional({ description: 'Nome do material', example: 'Brita 1 Atualizada' })
  name?: string;

  @ApiPropertyOptional({ 
    enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
    description: 'Tipo do material',
    example: 'coarseAggregate'
  })
  type?: 'coarseAggregate' | 'fineAggregate' | 'filler' | 'asphaltBinder' | 'CAP' | 'other';

  @ApiPropertyOptional({ type: () => DescriptionDto, description: 'Informações adicionais do material' })
  description?: DescriptionDto;
}