export type Curve = {
  a: number;
  b: number;
};

export type OptimumBinder = {
  confirmedPercentsOfDosage: number[];
  curveRBV: Curve;
  curveVv: Curve;
  optimumContent: number;
  pointsOfCurveDosage: number[][];
};

export type ExpectedParameters = {
  Gmb: number;
  RBV: number;
  Vam: number;
  Vv: number;
  newMaxSpecificGravity: number;
};

export type GraphicsData = {
  rbv: [[string, string], ...[number, number][]];
  vv: [[string, string], ...[number, number][]];
  sg: [[string, string], ...[number, number][]];
  gmb: [[string, string], ...[number, number][]];
  stability: [[string, string], ...[number, number][]];
  vam: [[string, string], ...[number, number][]];
};


export type OptimumBinderContentData = {
  optimumBinder: OptimumBinder;
  expectedParameters: {
    expectedParameters: ExpectedParameters;
  };
  graphics: GraphicsData;
};
