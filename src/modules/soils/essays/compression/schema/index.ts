import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Sample } from 'modules/soils/samples/schemas';
import { HydratedDocument } from 'mongoose';
import { Calc_Compression_Out } from '../dto/calc.compression.dto';

export type CompressionDocument = HydratedDocument<Compression>;

export type CompressionGeneralData = {
  userId: string;
  name: string;
  sample: Sample;
  createdAt: Date;
  operator?: string;
  cauculist?: string;
  description?: string;
};

type hygroscopicData = {
  hygroscopicTable: hygTable[];
  moldNumber: number; // número de molde
  moldVolume: number; // volume do molde (cm³)
  moldWeight: number; // peso do molde (g)
  socketWeight: number; // peso do soquete (g)
  spaceDiscThickness: number; // espessura do disco espaçador (cm)
  strokesPerLayer: number; // golpes/camada
  layers: number; 
};

export type hygTable = {
  id: number;
  capsulesNumberHyg: number; // número de cápsulas
  wetGrossWeightsCapsuleHyg: number; // peso bruto úmido (g)
  dryGrossWeightsHyg: number; // peso bruto seco (g)
  capsulesWeightsHyg: number; // peso da cápsula (g)
};

type humidityDeterminationData = {
  humidityTable: {
    id: number;
    capsulesNumberHum: number; // número de capsulas
    wetGrossWeightsCapsuleHum: number; // peso bruto úmido (g)
    wetWeightsCapsules: number; // peso úmido da amostra + cápsula (g)
    dryWeightsCapsules: number; // peso seco da amostra + capsula (g)
    capsulesWeightsHum: number; // peso da cápsula (g)
  }[];
}

@Schema({ collection: 'compression' })
export class Compression {
  _id: string;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: CompressionGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  hygroscopicData: hygroscopicData;

  @IsNotEmpty()
  @Prop({ type: Object })
  humidityDeterminationData: humidityDeterminationData;

  @IsNotEmpty()
  @Prop({ type: Object })
  results: {
    data: Calc_Compression_Out;
  };
}

export const CompressionSchema = SchemaFactory.createForClass(Compression);
