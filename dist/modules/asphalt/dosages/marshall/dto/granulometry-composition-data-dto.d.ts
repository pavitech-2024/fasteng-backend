export declare class TableRowDTO {
    sieve_label: string;
    _id: string;
    total_passant: string;
    passant: string;
}
export declare class TableDataDTO {
    table_rows: TableRowDTO[];
}
export declare class GranulometryCompositionDataDTO {
    table_data: TableDataDTO[];
    percentageInputs: {
        [key: string]: number;
    }[];
    sumOfPercents: number[];
    dnitBands: {
        higher: [string, number][];
        lower: [string, number][];
    };
    pointsOfCurve: any[];
    percentsOfMaterials: any[];
    graphData: any[];
    name: string;
}
