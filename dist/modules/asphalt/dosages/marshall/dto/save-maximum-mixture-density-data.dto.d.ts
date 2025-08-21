declare class MaxSpecificGravityResultDTO {
    lessOne: number;
    lessHalf: number;
    normal: number;
    plusHalf: number;
    plusOne: number;
}
declare class MaxSpecificGravityDTO {
    result: MaxSpecificGravityResultDTO;
    method: string;
}
export declare class SaveMaximumMixtureDensityDataDTO {
    name: string;
    maxSpecificGravity?: MaxSpecificGravityDTO;
    listOfSpecificGravities?: number[];
}
export {};
