import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";
import { GranulometryComposition_Marshall_Service } from "../service/granulometry-composition.marshall.service";

export type MarshallDocument = HydratedDocument<Marshall>;

export type MarshallGeneralData = {
  userId: string;
  name: string;
  laboratory?: string;
  operator?: string;
  calculist?: string;
  objective: "bearing" | "bonding";
  dnitBand: "A" | "B" | "C";
  description?: string;
}

export type MarshallMaterialData = {
  aggregates: {
    name: string,
    _id: string
  }[],
  binder: string
}

export type GranulometryCompositionData = {
  table_data: {
    table_rows: {
      sieve_label: string,
      _id: string,
      total_passant: string,
      passant: string,
    }
  }[],
  percentageInputs: { [key: string]: number }[];
  sumOfPercents: number[];
  dnitBands: { higher: [string, number][], lower: [string, number][] };
  pointsOfCurve: any[];
  percentsOfMaterials: any[];
  graphData: any[],
  name: string
}

export type BinderTrialData = {
  trial: number
  percentsOfDosage: any[];
  bandsOfTemperatures: {
    machiningTemperatureRange: {
      higher: number,
      average: number,
      lower: number
    },
    compressionTemperatureRange: {
      higher: number,
      average: number,
      lower: number
    },
    AggregateTemperatureRange: {
      higher: number,
      average: number,
      lower: number
    },
  }
}

export type MaximumMixtureDensityData = {
  maxSpecificGravity: {
    result: {
      lessOne: number,
      lessHalf: number,
      normal: number,
      plusHalf: number,
      plusOne: number,
    },
    method: string
  }
}

export type VolumetricParametersData = {
  pointsOfCurveDosageRBV: {
    x: number,
    y: number
  }[],
  pointsOfCurveDosageVv: {
    x: number,
    y: number
  }[],
  volumetricParameters: {
    asphaltContent: number,
    values: {
      aggregateVolumeVoids: number,
      apparentBulkSpecificGravity: number,
      diametricalCompressionStrength: number,
      fluency: number,
      maxSpecificGravity: number,
      ratioBitumenVoid: number,
      stability: number,
      voidsFilledAsphalt: number,
      volumeVoids: number
    }
  }[]
}

@Schema({ collection: 'marshalls'})
export class Marshall {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: MarshallGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  materialSelectionData: MarshallMaterialData

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryCompositionData: GranulometryCompositionData

  @IsNotEmpty()
  @Prop({ type: Object })
  binderTrialData: BinderTrialData

  @IsNotEmpty()
  @Prop({ type: Object })
  maximumMixtureDensityData: MaximumMixtureDensityData

  @IsNotEmpty()
  @Prop({ type: Object })
  volumetricParametersData: VolumetricParametersData
}

const MarshallSchema = SchemaFactory.createForClass(Marshall);
MarshallSchema.set('timestamps', true);
MarshallSchema.set('versionKey', false)

export { MarshallSchema };