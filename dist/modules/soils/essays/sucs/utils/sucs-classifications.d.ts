declare class SUCS_references {
    value: number;
    range: {
        gt: number;
        lt: number;
    };
    type: 'min' | 'max' | 'equal' | 'range';
}
export declare class Sucs_DataEntry {
}
export declare class Sucs_Classification {
    code: string;
    params: {
        sieve4?: SUCS_references;
        sieve200?: SUCS_references;
        liquidity_limit?: SUCS_references;
        organic_matter?: boolean;
        ip_condition?: boolean;
        cnu: SUCS_references;
        cc: SUCS_references;
    };
    constructor({ code, sieve4, sieve200, liquidity_limit, organic_matter, ip_condition, cnu, cc, }: {
        code: any;
        sieve4: any;
        sieve200: any;
        liquidity_limit: any;
        organic_matter: any;
        ip_condition: any;
        cnu: any;
        cc: any;
    });
    validateParams: (field: string, values: any, ranges: any) => boolean;
}
declare const sucs_classifications: Sucs_Classification[];
export default sucs_classifications;
