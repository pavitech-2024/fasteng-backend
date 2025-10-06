"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSieveValue = void 0;
const interfaces_1 = require("../../../utils/interfaces");
const getSieveValue = (label, isSuperpave) => {
    console.log('=== DEBUG GETSIEVEVALUE ===');
    console.log('Label recebido:', label);
    console.log('isSuperpave:', isSuperpave);
    if (!label) {
        console.log('❌ Label é undefined ou vazio!');
        return 0;
    }
    let sieveSeries = interfaces_1.AllSieves;
    if (isSuperpave)
        sieveSeries = interfaces_1.AllSievesSuperpaveUpdatedAstm;
    console.log('Sieve series:', sieveSeries);
    const sieve = sieveSeries.find((sieve) => {
        console.log(`Comparando: "${sieve.label}" com "${label}"`);
        return sieve.label === label;
    });
    console.log('Sieve encontrado:', sieve);
    if (!sieve) {
        console.log(`❌ Peneira não encontrada para label: "${label}"`);
        const numericMatch = label.match(/(\d+[.,]\d+)/);
        if (numericMatch) {
            const fallbackValue = parseFloat(numericMatch[1].replace(',', '.'));
            console.log(`✅ Usando fallback value: ${fallbackValue}`);
            return fallbackValue;
        }
        return 0;
    }
    if (sieve.value === undefined || sieve.value === null) {
        console.log(`❌ sieve.value é undefined para: "${label}"`);
        return 0;
    }
    console.log(`✅ Retornando value: ${sieve.value}`);
    return sieve.value;
};
exports.getSieveValue = getSieveValue;
//# sourceMappingURL=sieves.js.map