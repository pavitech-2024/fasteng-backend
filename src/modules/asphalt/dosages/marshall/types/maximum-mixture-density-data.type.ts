export type MaximumMixtureDensityData = {
  maxSpecificGravity: {
    result: {
      lessOne: number;
      lessHalf: number;
      normal: number;
      plusHalf: number;
      plusOne: number;
    };
    method: string;
  };
  listOfSpecificGravities: number[];
};
