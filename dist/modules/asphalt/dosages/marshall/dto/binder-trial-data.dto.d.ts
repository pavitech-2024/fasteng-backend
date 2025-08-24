export declare class TemperatureRangeDTO {
    higher: number;
    average: number;
    lower: number;
}
export declare class BandsOfTemperaturesDTO {
    machiningTemperatureRange: TemperatureRangeDTO;
    compressionTemperatureRange: TemperatureRangeDTO;
    AggregateTemperatureRange: TemperatureRangeDTO;
}
export declare class BinderTrialDataDTO {
    trial: number;
    percentsOfDosage: any[];
    newPercentOfDosage: any[];
    bandsOfTemperatures: BandsOfTemperaturesDTO;
    binder: string;
}
export declare class SaveMarshallDosageDTO {
    data: BinderTrialDataDTO;
    isConsult?: boolean;
}
