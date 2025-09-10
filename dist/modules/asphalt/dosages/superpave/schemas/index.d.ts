import { HydratedDocument } from 'mongoose';
export type SuperpaveDocument = HydratedDocument<Superpave>;
export type SuperpaveGeneralData = {
    userId: string;
    name: string;
    laboratory?: string;
    operator?: string;
    calculist?: string;
    trafficVolume: 'low' | 'medium' | 'medium-high' | 'high';
    objective: 'bearing' | 'bonding';
    dnitBand: 'A' | 'B' | 'C';
    description?: string;
    step: number;
};
export type GranulometryEssayResults = {
    material: SuperpaveGeneralData;
    result: any;
};
export type SuperpaveGranulometryEssayData = {
    material_mass: number;
    table_data: {
        sieve_label: string;
        sieve_value: number;
        passant: number;
        retained: number;
    }[];
    bottom: number;
};
export type SuperpaveGranulometryEssayResults = {
    granulometrys: GranulometryEssayResults[];
    viscosity: GranulometryEssayResults;
};
export type SuperpaveMaterialData = {
    aggregates: {
        name: string;
        _id: string;
    }[];
    binder: string;
};
export type GranulometryCompositionData = {
    percentageInputs: {
        material_1: string;
        material_2: string;
    }[];
    graphData: any[];
    percentsToList: any[];
    lowerComposition: {
        percentsOfMaterials: [[], []];
        sumOfPercents: [];
    };
    averageComposition: {
        percentsOfMaterials: [[], []];
        sumOfPercents: [];
    };
    higherComposition: {
        percentsOfMaterials: [[], []];
        sumOfPercents: [];
    };
    nominalSize: {
        value: number;
    };
    pointsOfCurve: number[];
    chosenCurves: {
        lower: boolean;
        average: boolean;
        higher: boolean;
    };
    bands: {
        higher: any[];
        lower: any[];
        letter: string;
    };
};
export type InitialBinderData = {
    binderSpoecificMass: number;
    granulometryComposition: {
        combinedGsa: number;
        combinedGsb: number;
        gse: number;
        mag: number;
        tmn: number;
        pli: number;
        va: number;
        vle: number;
        percentsOfDosageWithBinder: number[];
    };
    material_1: {
        absorption: number;
        apparentSpecificMass: number;
        realSpecificMass: number;
    };
    material_2: {
        absorption: number;
        apparentSpecificMass: number;
        realSpecificMass: number;
    };
    turnNumber: {
        initialN: number;
        maxN: number;
        projectN: number;
        tex: string;
    };
};
export type FirstCompressionData = {
    inferiorRows: {
        id: number;
        diammeter: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        document: string;
    }[];
    intermediariaRows: {
        id: number;
        diammeter: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        document: string;
    }[];
    superiorRows: {
        id: number;
        diammeter: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        document: string;
    }[];
    spreadSheetTemplate: string;
    maximumDensity: {
        lower: {
            gmm: number;
            gmb: number;
        };
        average: {
            gmm: number;
            gmb: number;
        };
        higher: {
            gmm: number;
            gmb: number;
        };
    };
    riceTest: {
        curve: string;
        drySampleMass: number;
        waterSampleMass: number;
        waterSampleContainerMass: number;
        gmm: number;
        temperatureOfWater: number;
    }[];
};
export type FirstCompressionParamsData = {
    table1: {
        expectedPorcentageGmmInitialN: number;
        expectedPorcentageGmmMaxN: number;
        expectedPorcentageGmmProjectN: number;
        expectedVam: number;
        expectedRBV_Higher: number;
        expectedRBV_Lower: number;
        nominalSize: number;
        trafficVolume: string;
    };
    table2: {
        table2Lower: {
            percentWaterAbs: null;
            percentageGmmInitialN: null;
            percentageGmmMaxN: null;
            percentageGmmProjectN: null;
            porcentageVam: null;
            porcentageVv: null;
            ratioDustAsphalt: null;
            specificMass: null;
        };
        table2Average: {
            percentWaterAbs: null;
            percentageGmmInitialN: null;
            percentageGmmMaxN: null;
            percentageGmmProjectN: null;
            porcentageVam: null;
            porcentageVv: null;
            ratioDustAsphalt: null;
            specificMass: null;
        };
        table2Higher: {
            percentWaterAbs: null;
            percentageGmmInitialN: null;
            percentageGmmMaxN: null;
            percentageGmmProjectN: null;
            porcentageVam: null;
            porcentageVv: null;
            ratioDustAsphalt: null;
            specificMass: null;
        };
    };
    table3: {
        table3Lower: {
            expectedPercentageGmmInitialNLower: number;
            expectedPercentageGmmMaxNLower: number;
            expectedPliLower: number;
            expectedVamLower: number;
            expectedRBVLower: number;
            expectedRatioDustAsphaltLower: number;
        };
        table3Average: {
            expectedPercentageGmmInitialNAverage: number;
            expectedPercentageGmmMaxNAverage: number;
            expectedPliAverage: number;
            expectedVamAverage: number;
            expectedRBVAverage: number;
            expectedRatioDustAsphaltAverage: number;
        };
        table3Higher: {
            expectedPercentageGmmInitialNHigher: number;
            expectedPercentageGmmMaxNHigher: number;
            expectedPliHigher: number;
            expectedVamHigher: number;
            expectedRBVHigher: number;
            expectedRatioDustAsphaltHigher: number;
        };
    };
    table4: {
        table4Lower: {
            data: any[];
        };
        table4Average: {
            data: any[];
        };
        table4Higher: {
            data: any[];
        };
    };
};
export type ChosenCurvePercentagesData = {
    listOfPlis: number[];
    porcentageAggregate: number[][];
    trafficVolume: string;
};
export type SecondCompressionData = {
    halfLess: {
        id: number;
        averageDiammeter: number;
        averageHeight: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        diametralTractionResistance: number;
    }[];
    halfPlus: {
        id: number;
        averageDiammeter: number;
        averageHeight: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        diametralTractionResistance: number;
    }[];
    normal: {
        id: number;
        averageDiammeter: number;
        averageHeight: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        diametralTractionResistance: number;
    }[];
    onePlus: {
        id: number;
        averageDiammeter: number;
        averageHeight: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        diametralTractionResistance: number;
    }[];
    maximumDensities: {
        insertedGmm: number;
        riceTest: {
            sampleAirDryMass: number;
            containerMassWaterSample: number;
            containerWaterMass: number;
            waterTemperatureCorrection: number | string;
        };
    }[];
    composition: {
        halfLess: {
            projectN: {
                samplesData: any[];
                gmb: number;
                percentWaterAbs: number;
                percentageGmm: number;
            };
            specifiesMass: number;
            gmm: number;
            Vv: number;
            Vam: number;
            expectedPli: number;
            RBV: number;
            ratioDustAsphalt: number;
            indirectTensileStrength: number;
        };
        normal: {
            projectN: {
                samplesData: any[];
                gmb: number;
                percentWaterAbs: number;
                percentageGmm: number;
            };
            specifiesMass: number;
            gmm: number;
            Vv: number;
            Vam: number;
            RBV: number;
            ratioDustAsphalt: number;
            indirectTensileStrength: number;
        };
        halfPlus: {
            projectN: {
                samplesData: any[];
                gmb: number;
                percentWaterAbs: number;
                percentageGmm: number;
            };
            specifiesMass: number;
            gmm: number;
            Vv: number;
            Vam: number;
            RBV: number;
            ratioDustAsphalt: number;
            indirectTensileStrength: number;
        };
        onePlus: {
            projectN: {
                samplesData: any[];
                gmb: number;
                percentWaterAbs: number;
                percentageGmm: number;
            };
            specifiesMass: number;
            gmm: number;
            Vv: number;
            Vam: number;
            RBV: number;
            ratioDustAsphalt: number;
            indirectTensileStrength: number;
        };
    };
    expectedPli: number;
    combinedGsb: number;
    percentsOfDosage: number[];
    Gse: number;
    ponderatedPercentsOfDosage: number[];
};
interface SecondCompressionParams {
    optimumContent: number;
    graphs: {
        graphVv: any[];
        graphVam: any[];
        graphGmb: any[];
        graphGmm: any[];
        graphRBV: any[];
        graphPA: any[];
        graphRT: any[];
    };
}
interface ConfirmationCompressionData {
    gmm: number;
    table: {
        averageDiammeter: number;
        averageHeight: number;
        dryMass: number;
        submergedMass: number;
        drySurfaceSaturatedMass: number;
        waterTemperatureCorrection: number;
        diametralTractionResistance: number;
    }[];
    riceTest: {
        sampleAirDryMass: number;
        containerSampleWaterMass: number;
        containerWaterMass: number;
        temperatureOfWater: number;
    };
}
interface DosageResume {
    Gmb: number;
    Gmm: number;
    RBV: number;
    Vam: number;
    Vv: number;
    diametralTractionResistance: number;
    gmm: number;
    percentWaterAbs: number;
    ponderatedPercentsOfDosage: number[];
    quantitative: number[];
    ratioDustAsphalt: number;
    specifiesMass: number;
}
export declare class Superpave {
    _id: string;
    step: number;
    generalData: SuperpaveGeneralData;
    granulometryEssayData: SuperpaveGranulometryEssayData;
    granulometryEssayResults: SuperpaveGranulometryEssayResults;
    materialSelectionData: SuperpaveMaterialData;
    granulometryCompositionData: GranulometryCompositionData;
    initialBinderData: InitialBinderData;
    firstCompressionData: FirstCompressionData;
    firstCompressionParamsData: FirstCompressionParamsData;
    chosenCurvePercentagesData: ChosenCurvePercentagesData;
    secondCompressionData: SecondCompressionData;
    secondCompressionParams: SecondCompressionParams;
    confirmationCompressionData: ConfirmationCompressionData;
    dosageResume: DosageResume;
}
declare const SuperpaveSchema: import("mongoose").Schema<Superpave, import("mongoose").Model<Superpave, any, any, any, import("mongoose").Document<unknown, any, Superpave> & Superpave & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Superpave, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Superpave>> & import("mongoose").FlatRecord<Superpave> & Required<{
    _id: string;
}>>;
export { SuperpaveSchema };
