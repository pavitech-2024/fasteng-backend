export interface ConfirmSpecificGravityBody {
  method: 'DMT' | 'GMM';
  listOfSpecificGravities: number[];
  percentsOfDosage: { [key: string]: number }[];
  confirmedPercentsOfDosage: number[];
  optimumContent: number;
  gmm?: number;
  valuesOfSpecificGravity?: {
    massOfDrySample: number;
    massOfContainerWaterSample: number;
    massOfContainerWater: number;
  };
}