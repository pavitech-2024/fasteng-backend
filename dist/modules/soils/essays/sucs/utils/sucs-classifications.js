"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucs_Classification = exports.Sucs_DataEntry = void 0;
class SUCS_references {
}
class Sucs_DataEntry {
}
exports.Sucs_DataEntry = Sucs_DataEntry;
class Sucs_Classification {
    constructor({ code, sieve4, sieve200, liquidity_limit, organic_matter, ip_condition, cnu, cc, }) {
        this.validateParams = (field, values, ranges) => {
            try {
                let isValid = true;
                if (this.params[field] === null)
                    return true;
                const { value: reference, type, range } = this.params[field];
                if (type === 'min') {
                    if (values[field] < reference)
                        isValid = false;
                }
                if (type === 'max') {
                    if (values[field] > reference)
                        isValid = false;
                }
                if (type === 'equal') {
                    if (values[field] != reference)
                        isValid = false;
                }
                if (type === 'range') {
                    if (range.lt >= reference || range.gt <= reference)
                        isValid = false;
                }
                return isValid;
            }
            catch (error) {
                throw error;
            }
        };
        this.code = code;
        this.params = {
            sieve4,
            sieve200,
            liquidity_limit,
            organic_matter,
            ip_condition,
            cnu,
            cc,
        };
    }
}
exports.Sucs_Classification = Sucs_Classification;
const sucs_classifications = [
    new Sucs_Classification({
        code: 'CH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: null,
        ip_condition: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'CL',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: null,
        ip_condition: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'CL-CH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: null,
        ip_condition: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: true,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OL',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: true,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OL-OH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: true,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'MH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: false,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'ML',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: false,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'ML-MH',
        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: false,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'GW',
        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: null,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP',
        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: null,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GC',
        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'GM',
        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'GW-GC',
        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GW-GM',
        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP-GC',
        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP-GM',
        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SW',
        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: null,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP',
        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: null,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SC',
        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'SM',
        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'SW-SC',
        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SW-SM',
        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP-SC',
        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: true,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP-SM',
        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12 }, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        ip_condition: false,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
];
exports.default = sucs_classifications;
//# sourceMappingURL=sucs-classifications.js.map