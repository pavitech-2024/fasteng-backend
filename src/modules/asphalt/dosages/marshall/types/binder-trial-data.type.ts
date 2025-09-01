export type BinderTrialData = {
  trial: number;
  percentsOfDosage: any[];
  newPercentOfDosage: any[];
  bandsOfTemperatures: {
    machiningTemperatureRange: {
      higher: number;
      average: number;
      lower: number;
    };
    compressionTemperatureRange: {
      higher: number;
      average: number;
      lower: number;
    };
    AggregateTemperatureRange: {
      higher: number;
      average: number;
      lower: number;
    };
  };
};
