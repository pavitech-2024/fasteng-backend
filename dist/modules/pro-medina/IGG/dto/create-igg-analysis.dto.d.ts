declare class DefectCountDto {
    code: string;
    count: number;
}
declare class PavementStationDto {
    id: number;
    stationNumber: string;
    section: string;
    tri: number;
    tre: number;
    defects: DefectCountDto[];
    date?: string;
}
export declare class CreateIggAnalysisDto {
    name: string;
    description?: string;
    road: string;
    section: string;
    subtrack?: string;
    pavementType: string;
    evaluationDate: string;
    stations: PavementStationDto[];
    results?: Record<string, any>;
    status?: string;
    userId?: string;
}
export {};
