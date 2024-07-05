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

export type InitialBinderData = {
  binderSpoecificMass: number,
  granulometryComposition: {
    combinedGsa: number,
    combinedGsb: number,
    gse: number,
    mag: number,
    tmn: number,
    pli: number,
    va: number,
    vle: number,
    percentsOfDosageWithBinder: number[]
  },
  material_1: {
    absorption: number,
    apparentSpecificMass: number,
    realSpecificMass: number
  },
  material_2: {
    absorption: number,
    apparentSpecificMass: number,
    realSpecificMass: number
  },
  turnNumber: {
    initialN: number,
    maxN: number,
    projectN: number,
    tex: string
  }
}

export type FirstCompressionData = {
  inferiorRows: {
    id: number,
    diammeter: number,
    dryMass: number,
    submergedMass: number,
    drySurfaceSaturatedMass: number,
    waterTemperatureCorrection: number,
    document: string
  }[],
  intermediariaRows: {
    id: number,
    diammeter: number,
    dryMass: number,
    submergedMass: number,
    drySurfaceSaturatedMass: number,
    waterTemperatureCorrection: number,
    document: string
  }[],
  superiorRows: {
    id: number,
    diammeter: number,
    dryMass: number,
    submergedMass: number,
    drySurfaceSaturatedMass: number,
    waterTemperatureCorrection: number,
    document: string
  }[],
  spreadSheetTemplate: string,
  maximumDensity: {
    lower: {
      gmm: number,
      gmb: number
    },
    average: {
      gmm: number,
      gmb: number
    },
    higher: {
      gmm: number,
      gmb: number
    }
  },
  riceTest: {
    curve: string,
    drySampleMass: number,
    waterSampleMass: number,
    waterSampleContainerMass: number,
    gmm: number,
    temperatureOfWater: number
  }[]
}

export type FirstCurvePercentagesData = {
  table1: {
    expectedPorcentageGmmInitialN: number;
    expectedPorcentageGmmMaxN: number;
    expectedPorcentageGmmProjectN: number;
    expectedVam: number;
    expectedRBV_Higher: number;
    expectedRBV_Lower: number;
    nominalSize: number;
    trafficVolume: string;
  },
  table2: {
    table2Lower: {
      percentWaterAbs: null,
      percentageGmmInitialN: null,
      percentageGmmMaxN: null,
      percentageGmmProjectN: null,
      porcentageVam: null,
      porcentageVv: null,
      ratioDustAsphalt: null,
      specificMass: null,
    },
    table2Average: {
      percentWaterAbs: null,
      percentageGmmInitialN: null,
      percentageGmmMaxN: null,
      percentageGmmProjectN: null,
      porcentageVam: null,
      porcentageVv: null,
      ratioDustAsphalt: null,
      specificMass: null,
    },
    table2Higher: {
      percentWaterAbs: null,
      percentageGmmInitialN: null,
      percentageGmmMaxN: null,
      percentageGmmProjectN: null,
      porcentageVam: null,
      porcentageVv: null,
      ratioDustAsphalt: null,
      specificMass: null,
    },
  },
  table3: {
    table3Lower: {
      expectedPercentageGmmInitialNLower: number,
      expectedPercentageGmmMaxNLower: number,
      expectedPliLower: number,
      expectedVamLower: number,
      expectedRBVLower: number,
      expectedRatioDustAsphaltLower: number,
    },
    table3Average: {
      expectedPercentageGmmInitialNAverage: number,
      expectedPercentageGmmMaxNAverage: number,
      expectedPliAverage: number,
      expectedVamAverage: number,
      expectedRBVAverage: number,
      expectedRatioDustAsphaltAverage: number,
    },
    table3Higher: {
      expectedPercentageGmmInitialNHigher: number,
      expectedPercentageGmmMaxNHigher: number,
      expectedPliHigher: number,
      expectedVamHigher: number,
      expectedRBVHigher: number,
      expectedRatioDustAsphaltHigher: number,
    }
  },
  table4: {
    table4Lower: {
      data: any[]
    },
    table4Average: {
      data: any[]
    },
    table4Higher: {
      data: any[]
    }
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

  @IsNotEmpty()
  @Prop({ type: Object })
  initialBinderData: InitialBinderData

  @IsNotEmpty()
  @Prop({ type: Object })
  firstCompressionData: FirstCompressionData

  @IsNotEmpty()
  @Prop({ type: Object })
  firstCurvePercentagesData: FirstCurvePercentagesData
}

const SuperpaveSchema = SchemaFactory.createForClass(Superpave);
SuperpaveSchema.set('timestamps', true);
SuperpaveSchema.set('versionKey', false)

export { SuperpaveSchema };
