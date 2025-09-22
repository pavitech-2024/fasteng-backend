export interface GranulometryComposition {
  expectedPli: number;
  [key: string]: number;
}

export interface ChosenCurvePercentagesRequest {
  curve: GranulometryComposition;
  trafficVolume: string;
  percentsOfDosage: Record<string, string>;
}

export interface ChosenCurvePercentagesResponse {
  porcentageAggregate: number[][];
  listOfPlis: number[];
  trafficVolume: string;
}

export interface SaveChosenCurveRequest {
  chosenCurvePercentagesData: {
    name: string;
    listOfPlis: number[];
    porcentageAggregate: number[][];
    trafficVolume: string;
  };
}

export interface SaveChosenCurveParams {
  body: SaveChosenCurveRequest;
  userId: string;
}