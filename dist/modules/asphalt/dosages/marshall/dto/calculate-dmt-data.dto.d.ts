import { IndexOfMissesSpecificGravityDTO } from './index-of-misses-specific-gravity.dto';
import { AggregateItemDTO } from './aggregate-item.dto';
export declare class CalculateDmtDataDTO {
    indexesOfMissesSpecificGravity: IndexOfMissesSpecificGravityDTO[];
    missingSpecificGravity: Record<string, number>;
    percentsOfDosage: number[][];
    aggregates: AggregateItemDTO[];
    trial: number;
}
