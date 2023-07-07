class HRB_references {
  value: number;
  type: 'min' | 'max';
}
// classes to be used on the classification
export class Hrb_Classification {
  code: string;

  params: {
    sieve10?: HRB_references;
    sieve40?: HRB_references;
    sieve200?: HRB_references;
    liquidity_limit?: HRB_references;
    plasticity_index?: HRB_references;
    group_index?: HRB_references;
  };

  constructor({ code, sieve10, sieve40, sieve200, liquidity_limit, plasticity_index, group_index }) {
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

  // função que verifica se cada params do classification é válido
  // se for válido, retorna true
  // se não for válido, retorna false
  validateParams = (field: string, values): boolean => {
    try {
      let isValid = true;

      // se não tiver o field no params, então é válido, ou seja, se na tabela não existe esse valor n precisa verificar
      if (this.params[field] === null) return true;

      const { value: reference, type } = this.params[field];

      // se for type min, então o values[field] tem que ser no minimo o reference
      if (type === 'min') {
        if (values[field] < reference) isValid = false;
      }

      // se for type max, então o values[field] tem que ser no maximo o reference
      if (type === 'max') {
        if (values[field] > reference) isValid = false;
      }

      return isValid;
    } catch (error) {
      throw error;
    }
  };
}

const hrb_classifications: Hrb_Classification[] = [
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

export default hrb_classifications;
