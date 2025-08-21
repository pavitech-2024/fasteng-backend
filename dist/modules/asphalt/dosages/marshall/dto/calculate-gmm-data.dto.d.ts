import { GmmValueDTO } from './gmm-value.dto';
import { AggregateItemDTO } from './aggregate-item.dto';
export declare class CalculateGmmDataDTO {
    gmm: GmmValueDTO[];
    temperatureOfWaterGmm: number;
    aggregates: AggregateItemDTO[];
}
