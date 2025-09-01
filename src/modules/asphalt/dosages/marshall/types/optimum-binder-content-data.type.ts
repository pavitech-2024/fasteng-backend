export type OptimumBinderContentData = {
  optimumBinder: {
    confirmedPercentsOfDosage: number[];
    curveRBV: { a: number; b: number };
    curveVv: { a: number; b: number };
    optimumContent: number;
    pointsOfCurveDosage: any[];
  };
  expectedParameters: {
    expectedParameters: {
      Gmb: number;
      RBV: number;
      Vam: number;
      Vv: number;
      newMaxSpecificGravity: number;
    };
  };
  graphics: {
    rbv: any[];
    vv: any[];
    sg: any[];
    gmb: any[];
    stability: any[];
    vam: any[];
  };
};
