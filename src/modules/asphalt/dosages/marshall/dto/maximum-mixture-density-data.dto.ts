import { ApiProperty } from '@nestjs/swagger';

export class MaxSpecificGravityResultDTO {
  @ApiProperty({ example: 2.3 })
  lessOne: number;

  @ApiProperty({ example: 2.35 })
  lessHalf: number;

  @ApiProperty({ example: 2.4 })
  normal: number;

  @ApiProperty({ example: 2.45 })
  plusHalf: number;

  @ApiProperty({ example: 2.5 })
  plusOne: number;
}

export class MaxSpecificGravityDTO {
  @ApiProperty({ type: MaxSpecificGravityResultDTO })
  result: MaxSpecificGravityResultDTO;

  @ApiProperty({ example: 'ASTM D2041' })
  method: string;
}

export class MaximumMixtureDensityDataDTO {
  @ApiProperty({ type: MaxSpecificGravityDTO })
  maxSpecificGravity: MaxSpecificGravityDTO;

  @ApiProperty({ type: [Number] })
  listOfSpecificGravities: number[];
}
