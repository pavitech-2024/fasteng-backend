import { ApiProperty } from '@nestjs/swagger';

export class ResponseAsphaltMaterialDto {
  
   /* name: "Brita 1";
    type: "coarseAggregate";
    createdAt: "2025-08-29T20:11:10.776Z";
    description: {
    source: "Pedreira XYZ",
    responsible: "João da Silva",
    maxDiammeter: "string",
    aggregateNature: "Granito",
    boughtDate: "2025-08-20",
    recieveDate: "2025-08-21",
    extractionDate: "2025-08-18",
    collectionDate: "2025-08-19",
    classification_CAP: "CAP 30/45",
    classification_AMP: "AMP 50/65",
    observation: "Material em boas condições"
}

    _id: "68b2095e46475043f784fbc8";
    __v: 0
}*/

  @ApiProperty({ example: '64e3f3d8f2a5c0a7b8e3d9f4', description: 'ID do material' })
  _id: string;

  @ApiProperty({ example: 'Brita 1', description: 'Nome do material' })
  name: string;

  @ApiProperty({
    example: 'coarseAggregate',
    description: 'Tipo do material',
    enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
  })
  type: string;

  @ApiProperty({
    example: {
      source: 'Fornecedor XYZ',
      responsible: 'Eng. João Silva',
      maxDiammeter: '4.8mm',
      aggregateNature: 'Granito',
    },
    description: 'Informações adicionais do material',
    required: false,
  })
  description?: Record<string, any>;

  @ApiProperty({ example: '2025-08-25T19:35:12.123Z', description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ example: 'user123', description: 'ID do usuário criador' })
  userId: string;
}
