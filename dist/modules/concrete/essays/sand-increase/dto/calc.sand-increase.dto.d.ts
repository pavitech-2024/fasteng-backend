import { MoistureContentTableData, SandIncrease, UnitMassTableData } from "../schema";
export declare class Calc_SandIncrease_Dto {
    sandIncreaseGeneralData: SandIncrease['generalData'];
    unitMassDeterminationData: SandIncrease['unitMassDeterminationData'];
    humidityFoundData: SandIncrease['humidityFoundData'];
}
export declare class Calc_UnitMassDto {
    containerVolume: string;
    containerWeight: string;
    tableData: UnitMassTableData[];
}
export declare class Calc_MoistureContentDto {
    tableData: MoistureContentTableData[];
}
export declare class Save_SandIncreaseDto {
    generalData: SandIncrease['generalData'];
    unitMassDeterminationData: SandIncrease['unitMassDeterminationData'];
    humidityFoundData: SandIncrease['humidityFoundData'];
    results: SandIncrease['results'];
}
export interface Calc_SandIncrease_Out {
    unitMasses: number[];
    moistureContent: number[];
    swellings: number[];
    curve: [number, number][];
    retaR: [number, number][];
    retaS: [number, number][];
    retaT: [number, number][];
    retaU: [number, number][];
    averageCoefficient: number;
    criticalHumidity: number;
}
