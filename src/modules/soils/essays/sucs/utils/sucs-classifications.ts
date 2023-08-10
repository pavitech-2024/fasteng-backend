class SUCS_references {
    value: number;
    range: {
        gt: number, // greater than
        lt: number, // lesser than
    }
    type: 'min' | 'max' | 'equal' | 'range';
}

export class Sucs_DataEntry {

}

export class Sucs_Classification {
    code: string;

    params: {
        sieve4?: SUCS_references;
        sieve200?: SUCS_references;
        liquidity_limit?: SUCS_references;
        organic_matter?: boolean;
        plasticity_index_greater_ref?: boolean;
        cnu: SUCS_references;
        cc: SUCS_references;
    };


    constructor({
        code,
        sieve4,
        sieve200,
        liquidity_limit,
        organic_matter,
        plasticity_index_greater_ref,
        cnu,
        cc,
    }) {

        this.code = code;

        this.params = {
            sieve4,
            sieve200,
            liquidity_limit,
            organic_matter,
            plasticity_index_greater_ref,
            cnu,
            cc,
        };
    }

    // função que verifica se cada params do classification é válido
    // se for válido, retorna true
    // se não for válido, retorna false
    validateParams = (field: string, values, ranges): boolean => {
        try {
            let isValid = true;

            // se não tiver o field no params, então é válido, ou seja, se na tabela não existe esse valor n precisa verificar
            if (this.params[field] === null) return true;

            const { value: reference, type, range } = this.params[field];

            // se for type min, então o values[field] tem que ser no minimo o reference
            if (type === 'min') {
                if (values[field] < reference) isValid = false;
            }

            // se for type max, então o values[field] tem que ser no maximo o reference
            if (type === 'max') {
                if (values[field] > reference) isValid = false;
            }

            // se for equal, então o values[field] tem que ser igual o reference
            if (type === 'equal') {
                if (values[field] != reference) isValid = false;
            }

            // se for range, então o range.lt tem que ser menor que o reference
            // e o range.gt tem que ser maior que o reference
            if (type === 'range') {
                if (range.lt >= reference || range.gt <= reference) isValid = false;
            }

            return isValid;
        } catch (error) {
            throw error;
        }
    };
}

const sucs_classifications: Sucs_Classification[] = [
    // Solos de Graduação Fina - #200 > 50%
    new Sucs_Classification({
        code: 'CH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'CL',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'CL-CH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: true,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OL',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: true,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'OL-OH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: true,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'MH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'min' },
        organic_matter: false,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'ML',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'max' },
        organic_matter: false,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'ML-MH',

        sieve4: null,
        sieve200: { value: 50, type: 'min' },
        liquidity_limit: { value: 50, type: 'equal' },
        organic_matter: false,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    // Solos de Graduação Grosseira - #200 <= 50%
    // Gravel
    new Sucs_Classification({
        code: 'GW',

        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: null,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP',

        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: null,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GC',

        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'GM',

        sieve4: { value: 50, type: 'max' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'GW-GC',

        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GW-GM',

        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP-GC',

        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'GP-GM',

        sieve4: { value: 50, type: 'max' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    // Sand
    new Sucs_Classification({
        code: 'SW',

        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: null,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP',

        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 5, type: 'max' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: null,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SC',

        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'SM',

        sieve4: { value: 50, type: 'min' },
        sieve200: { value: 12, type: 'min' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: null,
        cc: null
    }),
    new Sucs_Classification({
        code: 'SW-SC',

        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SW-SM',

        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: { value: 4, type: 'min' },
        cc: { range: { gt: 1, lt: 3 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP-SC',

        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: true,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
    new Sucs_Classification({
        code: 'SP-SM',

        sieve4: { value: 50, type: 'min' },
        sieve200: { range: { gt: 5, lt: 12}, type: 'range' },
        liquidity_limit: null,
        organic_matter: null,
        plasticity_index_greater_ref: false,
        cnu: { value: 4, type: 'max' },
        cc: { range: { gt: 3, lt: 1 }, type: 'range' }
    }),
];

export default sucs_classifications;