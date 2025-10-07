import { AllSieves, AllSievesSuperpaveUpdatedAstm, Sieve } from '../../../utils/interfaces';

export const getSieveValue = (label: string): number => {
  console.log('=== DEBUG GETSIEVEVALUE ===');
  console.log('Label recebido:', label);

  if (!label) {
    console.error('❌ ERRO: Label é undefined ou vazio!');
    throw new Error('Label da peneira não fornecido');
  }

  // Normaliza o label para comparação
  const normalizeLabel = (l: string) => {
    return l
      .toLowerCase()
      .replace(/[,]/g, '.')            // vírgula → ponto
      .replace(/\s+/g, ' ')            // múltiplos espaços → 1 espaço
      .replace(/[°º]/g, '')            // remove símbolos de grau
      .replace(/pol/g, 'pol')          // garante uniformidade
      .replace(/nº|n/g, 'n')           // normaliza N° para n
      .trim();
  };

  const normalizedInput = normalizeLabel(label);

  // Função interna para buscar em uma série
  const findInSeries = (series: Sieve[]) => {
    return series.find(sieve => normalizeLabel(sieve.label) === normalizedInput);
  };

  // Primeiro tenta Superpave
  let sieve = findInSeries(AllSievesSuperpaveUpdatedAstm);

  // Se não encontrar, tenta série padrão
  if (!sieve) sieve = findInSeries(AllSieves);

  console.log('Sieve encontrado:', sieve);

  if (!sieve) {
    throw new Error(
      `❌ Peneira não configurada no sistema: "${label}".\n` +
      `Superpave disponíveis: ${AllSievesSuperpaveUpdatedAstm.map(s => s.label).join(', ')}\n` +
      `Padrão disponíveis: ${AllSieves.map(s => s.label).join(', ')}`
    );
  }

  if (sieve.value === undefined || sieve.value === null) {
    throw new Error(`❌ Valor da peneira não definido: "${label}"`);
  }

  console.log(`✅ Retornando value REAL: ${sieve.value}`);
  return sieve.value;
};
