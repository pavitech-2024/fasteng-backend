import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { HydratedDocument } from "mongoose";

export type SuperpaveDocument = HydratedDocument<Superpave>;

export type SuperpaveGeneralData = {
  userId: string;
  name: string;
  laboratory?: string;
  operator?: string;
  calculist?: string;
  trafficVolume: "low" | "medium" | "medium-high" | "high";
  objective: "bearing" | "bonding";
  dnitBand: "A" | "B" | "C";
  description?: string;
}

export type SuperpaveMaterialData = {
  aggregates: {
    name: string,
    _id: string
  }[],
  binder: string
}

export type GranulometryCompositionData = {
  percentageInputs: {
    material_1: string,
    material_2: string
  }[];
  graphData: any[];
  percentsToList: any[];
  lowerComposition: {
    percentsOfMaterials: [[],[]],
    sumOfPercents: []
  },
  averageComposition: {
    percentsOfMaterials: [[],[]],
    sumOfPercents: []
  },
  higherComposition: {
    percentsOfMaterials: [[],[]],
    sumOfPercents: []
  },
  nominalSize: {
    value: number
  };
  pointsOfCurve: number[],
  chosenCurves: {
    lower: boolean,
    average: boolean,
    higher: boolean
  },
  bands: {
    higher: any[],
    lower: any[],
    letter: string
  }
}

@Schema({ collection: 'superpaves'})
export class Superpave {
  _id: string;
  step: number;

  @IsNotEmpty()
  @Prop({ type: Object })
  generalData: SuperpaveGeneralData;

  @IsNotEmpty()
  @Prop({ type: Object })
  materialSelectionData: SuperpaveMaterialData

  @IsNotEmpty()
  @Prop({ type: Object })
  granulometryCompositionData: GranulometryCompositionData
}

const SuperpaveSchema = SchemaFactory.createForClass(Superpave);
SuperpaveSchema.set('timestamps', true);
SuperpaveSchema.set('versionKey', false)

export { SuperpaveSchema };
