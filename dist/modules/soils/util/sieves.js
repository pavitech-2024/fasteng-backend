"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSieveValue = void 0;
const interfaces_1 = require("../../../utils/interfaces");
const getSieveValue = (label) => {
    console.log('=== DEBUG GETSIEVEVALUE ===');
    console.log('Label recebido:', label);
    if (!label) {
        console.error('❌ ERRO: Label é undefined ou vazio!');
        throw new Error('Label da peneira não fornecido');
    }
    const normalizeLabel = (l) => {
        return l
            .toLowerCase()
            .replace(/[,]/g, '.')
            .replace(/\s+/g, ' ')
            .replace(/[°º]/g, '')
            .replace(/pol/g, 'pol')
            .replace(/nº|n/g, 'n')
            .trim();
    };
    const normalizedInput = normalizeLabel(label);
    const findInSeries = (series) => {
        return series.find(sieve => normalizeLabel(sieve.label) === normalizedInput);
    };
    let sieve = findInSeries(interfaces_1.AllSievesSuperpaveUpdatedAstm);
    if (!sieve)
        sieve = findInSeries(interfaces_1.AllSieves);
    console.log('Sieve encontrado:', sieve);
    if (!sieve) {
        throw new Error(`❌ Peneira não configurada no sistema: "${label}".\n` +
            `Superpave disponíveis: ${interfaces_1.AllSievesSuperpaveUpdatedAstm.map(s => s.label).join(', ')}\n` +
            `Padrão disponíveis: ${interfaces_1.AllSieves.map(s => s.label).join(', ')}`);
    }
    if (sieve.value === undefined || sieve.value === null) {
        throw new Error(`❌ Valor da peneira não definido: "${label}"`);
    }
    console.log(`✅ Retornando value REAL: ${sieve.value}`);
    return sieve.value;
};
exports.getSieveValue = getSieveValue;
//# sourceMappingURL=sieves.js.map