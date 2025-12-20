export declare class FwdSampleDto {
    stationNumber: number;
    d0: number;
    d20: number;
    d30: number;
    d45: number;
    d60: number;
    d90: number;
    d120: number;
    d150: number;
    d180: number;
    date?: Date;
    airTemperature?: number;
    pavementTemperature?: number;
    appliedLoad?: number;
}
export declare class CreateFwdAnalysisDto {
    name: string;
    description?: string;
    samples: FwdSampleDto[];
    status?: string;
    userId?: string;
}
