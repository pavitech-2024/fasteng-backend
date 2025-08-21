export declare class GmmItemDTO {
    id: number;
    value?: number;
    massOfContainer_Water_Sample: number;
    massOfContainer_Water: number;
    massOfDrySample: number;
}
export declare class CalculateGmmDTO {
    gmm: GmmItemDTO[];
    temperatureOfWaterGmm: number;
    aggregates: string[];
}
