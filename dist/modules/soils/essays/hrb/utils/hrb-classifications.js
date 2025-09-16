"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hrb_Classification = void 0;
class HRB_references {
}
class Hrb_Classification {
    constructor({ code, sieve10, sieve40, sieve200, liquidity_limit, plasticity_index, group_index }) {
        this.validateParams = (field, values) => {
            try {
                let isValid = true;
                if (this.params[field] === null)
                    return true;
                const { value: reference, type } = this.params[field];
                if (type === 'min') {
                    if (values[field] < reference)
                        isValid = false;
                }
                if (type === 'max') {
                    if (values[field] > reference)
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
            sieve10,
            sieve40,
            sieve200,
            liquidity_limit,
            plasticity_index,
            group_index,
        };
    }
}
exports.Hrb_Classification = Hrb_Classification;
const hrb_classifications = [
    new Hrb_Classification({
        code: 'A-1-a',
        sieve10: { value: 50, type: 'max' },
        sieve40: { value: 30, type: 'max' },
        sieve200: { value: 15, type: 'max' },
        liquidity_limit: null,
        plasticity_index: { value: 6, type: 'max' },
        group_index: { value: 0, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-1-b',
        sieve10: null,
        sieve40: { value: 50, type: 'max' },
        sieve200: { value: 25, type: 'max' },
        liquidity_limit: null,
        plasticity_index: { value: 6, type: 'max' },
        group_index: { value: 0, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-3',
        sieve10: null,
        sieve40: { value: 51, type: 'min' },
        sieve200: { value: 10, type: 'max' },
        liquidity_limit: null,
        plasticity_index: { value: 0, type: 'max' },
        group_index: { value: 0, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-2-4',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 35, type: 'max' },
        liquidity_limit: { value: 40, type: 'max' },
        plasticity_index: { value: 10, type: 'max' },
        group_index: { value: 0, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-2-5',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 35, type: 'max' },
        liquidity_limit: { value: 41, type: 'min' },
        plasticity_index: { value: 10, type: 'max' },
        group_index: { value: 0, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-2-6',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 35, type: 'max' },
        liquidity_limit: { value: 40, type: 'max' },
        plasticity_index: { value: 11, type: 'min' },
        group_index: { value: 4, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-2-7',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 35, type: 'max' },
        liquidity_limit: { value: 41, type: 'min' },
        plasticity_index: { value: 11, type: 'min' },
        group_index: { value: 4, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-4',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 36, type: 'min' },
        liquidity_limit: { value: 40, type: 'max' },
        plasticity_index: { value: 10, type: 'max' },
        group_index: { value: 8, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-5',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 36, type: 'min' },
        liquidity_limit: { value: 41, type: 'min' },
        plasticity_index: { value: 10, type: 'max' },
        group_index: { value: 12, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-6',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 36, type: 'min' },
        liquidity_limit: { value: 40, type: 'max' },
        plasticity_index: { value: 11, type: 'min' },
        group_index: { value: 16, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-7-5',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 36, type: 'min' },
        liquidity_limit: { value: 41, type: 'min' },
        plasticity_index: { value: 11, type: 'min' },
        group_index: { value: 20, type: 'max' },
    }),
    new Hrb_Classification({
        code: 'A-7-6',
        sieve10: null,
        sieve40: null,
        sieve200: { value: 36, type: 'min' },
        liquidity_limit: { value: 41, type: 'min' },
        plasticity_index: { value: 11, type: 'min' },
        group_index: { value: 20, type: 'max' },
    }),
];
exports.default = hrb_classifications;
//# sourceMappingURL=hrb-classifications.js.map