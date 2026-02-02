"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSieveValue = void 0;
const interfaces_1 = require("../../../utils/interfaces");
const getSieveValue = (label, isSuperpave) => {
    let sieveSeries = interfaces_1.AllSieves;
    if (isSuperpave)
        sieveSeries = interfaces_1.AllSievesSuperpaveUpdatedAstm;
    const foundSieve = sieveSeries.find((sieve) => sieve.label === label);
    if (!foundSieve) {
        const match = label.match(/-\s*(\d+[,.]?\d*)\s*(mm|pol)/i);
        if (match) {
            const value = parseFloat(match[1].replace(',', '.'));
            return value;
        }
        const anyNumberMatch = label.match(/(\d+[,.]?\d*)\s*(mm|pol)/i);
        if (anyNumberMatch) {
            const value = parseFloat(anyNumberMatch[1].replace(',', '.'));
            return value;
        }
        console.warn(`Sieve "${label}" not found and cannot extract value`);
        return 0;
    }
    return foundSieve.value;
};
exports.getSieveValue = getSieveValue;
//# sourceMappingURL=sieves.js.map