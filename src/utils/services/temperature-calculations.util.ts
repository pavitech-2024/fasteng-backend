import { TemperatureRangeDTO } from "modules/asphalt/dosages/marshall/dto/binder-trial-data.dto";
export class TemperatureCalculationsUtil {
  static calculateTemperatureRange(higher: number, lower: number): TemperatureRangeDTO {
    return {
      higher,
      average: (higher + lower) / 2,
      lower
    };
  }

  static calculateAggregateTemperatureRange(machiningHigher: number, machiningLower: number): TemperatureRangeDTO {
    const higherAggregate = Math.min(machiningHigher + 15, 177);
    const lowerAggregate = Math.min(machiningLower + 15, 177);
    
    return {
      higher: higherAggregate,
      average: (higherAggregate + lowerAggregate) / 2,
      lower: lowerAggregate
    };
  }
}