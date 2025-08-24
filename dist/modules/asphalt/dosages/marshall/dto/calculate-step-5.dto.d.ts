export declare class CalculateStep3DTO {
    dnitBands: 'A' | 'B' | 'C';
    aggregates: {
        _id: string;
        name: string;
    }[];
    percentageInputs: {
        [key: string]: number;
    }[];
    tableRows: any[];
}
