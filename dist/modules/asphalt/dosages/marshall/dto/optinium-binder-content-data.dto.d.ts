export declare class CurveDTO {
    a: number;
    b: number;
}
export declare class OptimumBinderDTO {
    confirmedPercentsOfDosage: number[];
    curveRBV: CurveDTO;
    curveVv: CurveDTO;
    optimumContent: number;
    pointsOfCurveDosage: any[];
}
export declare class ExpectedParametersDTO {
    Gmb: number;
    RBV: number;
    Vam: number;
    Vv: number;
    newMaxSpecificGravity: number;
}
export declare class OptimumBinderContentDataDTO {
    optimumBinder: OptimumBinderDTO;
    expectedParameters: {
        expectedParameters: ExpectedParametersDTO;
    };
    graphics: {
        rbv: any[];
        vv: any[];
        sg: any[];
        gmb: any[];
        stability: any[];
        vam: any[];
    };
}
