import { AllSieves, AllSievesSuperpaveUpdatedAstm, Sieve } from '../../../utils/interfaces';

/* Example:
    label: N° 10 - 2.00 mm 

    return 2 // em mm

*/

export const getSieveValue = (label: string, isSuperpave?: boolean): number => {
  let sieveSeries = AllSieves;
  if (isSuperpave) sieveSeries = AllSievesSuperpaveUpdatedAstm;
  const value = sieveSeries.find((sieve: Sieve) => sieve.label === label).value;
  return value;
} 