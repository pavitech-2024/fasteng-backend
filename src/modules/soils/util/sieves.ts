import { AllSieves, AllSievesSuperpaveUpdatedAstm, Sieve } from '../../../utils/interfaces';

/* Example:
    label: N° 10 - 2.00 mm 

    return 2 // em mm

*/

//Antes sem validação pra value. Agora com validação e logs detalhados. Value quebrava no for. agora todos os gráficos funcionbam.
export const getSieveValue = (label: string, isSuperpave?: boolean): number => {
  console.log('=== DEBUG GETSIEVEVALUE ===');
  console.log('Label recebido:', label);
  console.log('isSuperpave:', isSuperpave);

  if (!label) {
    console.log('❌ Label é undefined ou vazio!');
    return 0;
  }

  let sieveSeries = AllSieves;
  if (isSuperpave) sieveSeries = AllSievesSuperpaveUpdatedAstm;

  console.log('Sieve series:', sieveSeries);

  // VALIDAÇÃO: Encontrar a peneira
  const sieve = sieveSeries.find((sieve: Sieve) => {
    console.log(`Comparando: "${sieve.label}" com "${label}"`);
    return sieve.label === label;
  });

  console.log('Sieve encontrado:', sieve);

  if (!sieve) {
    console.log(`❌ Peneira não encontrada para label: "${label}"`);

    // FALLBACK: Tentar extrair valor numérico do label
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
