export declare class MaxSpecificGravityResultDTO {
    lessOne: number;
    lessHalf: number;
    normal: number;
    plusHalf: number;
    plusOne: number;
}
export declare class MaxSpecificGravityDTO {
    result: MaxSpecificGravityResultDTO;
    method: string;
}
export declare class MaximumMixtureDensityDataDTO {
    maxSpecificGravity: MaxSpecificGravityDTO;
    listOfSpecificGravities: number[];
}
