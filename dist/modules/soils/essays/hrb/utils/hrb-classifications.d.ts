declare class HRB_references {
    value: number;
    type: 'min' | 'max';
}
export declare class Hrb_Classification {
    code: string;
    params: {
        sieve10?: HRB_references;
        sieve40?: HRB_references;
        sieve200?: HRB_references;
        liquidity_limit?: HRB_references;
        plasticity_index?: HRB_references;
        group_index?: HRB_references;
    };
    constructor({ code, sieve10, sieve40, sieve200, liquidity_limit, plasticity_index, group_index }: {
        code: any;
        sieve10: any;
        sieve40: any;
        sieve200: any;
        liquidity_limit: any;
        plasticity_index: any;
        group_index: any;
    });
    validateParams: (field: string, values: any) => boolean;
}
declare const hrb_classifications: Hrb_Classification[];
export default hrb_classifications;
