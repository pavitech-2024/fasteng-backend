export type GranulometryCompositionData = {
  table_data: {
    table_rows: {
      sieve_label: string;
      _id: string;
      total_passant: string;
      passant: string;
    };
  }[];
  percentageInputs: { [key: string]: number }[];
  sumOfPercents: number[];
  dnitBands: {
    higher: [string, number][];
    lower: [string, number][];
  };
  pointsOfCurve: any[];
  percentsOfMaterials: any[];
  graphData: any[];
  name: string;
};
