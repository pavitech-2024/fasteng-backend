import { AllSieves, AllSievesSuperpaveUpdatedAstm, Sieve } from '../../../utils/interfaces';

/* Example:
    label: N° 10 - 2.00 mm 

    return 2 // em mm

*/
//correcao p os valores undefined
export const getSieveValue = (label: string, isSuperpave?: boolean): number => {
  let sieveSeries = AllSieves;
  if (isSuperpave) sieveSeries = AllSievesSuperpaveUpdatedAstm;
  
  const foundSieve = sieveSeries.find((sieve: Sieve) => sieve.label === label);
  
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
}