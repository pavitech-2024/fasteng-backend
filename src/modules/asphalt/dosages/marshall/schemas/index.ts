import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

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
  newPercentOfDosage: any[];
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
  },
  listOfSpecificGravities: number[]
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

export type OptimumBinderContentData = {
  optimumBinder: {
    confirmedPercentsOfDosage: number[],
    curveRBV: {
      a: number,
      b: number
    },
    curveVv: {
      a: number,
      b: number
    },
    optimumContent: number,
    pointsOfCurveDosage: any[]
  },
  expectedParameters: {
    expectedParameters: {
      Gmb: number,
      RBV: number,
      Vam: number,
      Vv: number,
      newMaxSpecificGravity: number
    }
  },
  graphics: {
    rbv: any[],
    vv: any[],
    sg: any[],
    gmb: any[],
    stability: any[],
    vam: any[]
  },
}

export type ConfirmationCompressionData = {
  dmt: number,
  gmm: number,
  confirmedSpecificGravity: {
    result: number,
    type: string,
  },
  confirmedVolumetricParameters: {
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
    }[],
  },
  optimumBinder: {
    id: number,
    diammeter: number,
    height: number,
    dryMass: number,
    submergedMass: number,
    drySurfaceSaturatedMass: number,
    stability: number,
    fluency: number,
    diametricalCompressionStrength: number
  }[],
  riceTest: {
    teor: string,
    massOfDrySample: number,
    massOfContainerWaterSample: number,
    massOfContainerWater: number,
  }
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

  @IsNotEmpty()
  @Prop({ type: Object })
  optimumBinderContentData: OptimumBinderContentData

  @IsNotEmpty()
  @Prop({ type: Object })
  confirmationCompressionData: ConfirmationCompressionData
}

const MarshallSchema = SchemaFactory.createForClass(Marshall);
MarshallSchema.set('timestamps', true);
MarshallSchema.set('versionKey', false)

export { MarshallSchema };