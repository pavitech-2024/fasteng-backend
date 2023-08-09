import { AllSieves, Sieve } from 'utils/interfaces';

/* Example:
    label: N° 10 - 2.00 mm 

    return 2 // em mm

*/

export const getSieveValue = (label: string): number => AllSieves.find((sieve: Sieve) => sieve.label === label).value;