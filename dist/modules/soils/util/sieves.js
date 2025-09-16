"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSieveValue = void 0;
const interfaces_1 = require("../../../utils/interfaces");
const getSieveValue = (label, isSuperpave) => {
    let sieveSeries = interfaces_1.AllSieves;
    if (isSuperpave)
        sieveSeries = interfaces_1.AllSievesSuperpaveUpdatedAstm;
    const value = sieveSeries.find((sieve) => sieve.label === label).value;
    return value;
};
exports.getSieveValue = getSieveValue;
//# sourceMappingURL=sieves.js.map