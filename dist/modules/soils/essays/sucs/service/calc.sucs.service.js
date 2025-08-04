"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Calc_SUCS_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SUCS_Service = void 0;
const common_1 = require("@nestjs/common");
const sucs_classifications_1 = require("../utils/sucs-classifications");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/soils/samples/repository");
let Calc_SUCS_Service = Calc_SUCS_Service_1 = class Calc_SUCS_Service {
    constructor(sucsRepository, sampleRepository) {
        this.sucsRepository = sucsRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(Calc_SUCS_Service_1.name);
        this.getDiameter = (list_sieves, percentage, limits) => {
            if (limits.upperLimit.value === percentage)
                return list_sieves[limits.upperLimit.index].passant;
            if (limits.inferiorLimit.value === percentage)
                return list_sieves[limits.inferiorLimit.index].passant;
            const coefficientA = (limits.upperLimit.value - limits.inferiorLimit.value) /
                (list_sieves[limits.upperLimit.index].passant - list_sieves[limits.inferiorLimit.index].passant);
            const coefficientB = limits.upperLimit.value / (coefficientA * list_sieves[limits.upperLimit.index].passant);
            return (percentage - coefficientB) / coefficientA;
        };
        this.getPercentage = (percentage, list_sieves) => {
            return list_sieves.reduce((accumulate, sieve, index) => {
                const { upperLimit, inferiorLimit } = accumulate;
                if (sieve.passant >= percentage) {
                    if (upperLimit.value === 0 || sieve.passant < upperLimit.value)
                        accumulate.upperLimit = {
                            value: sieve.passant,
                            index: index
                        };
                }
                else {
                    if (inferiorLimit.value === 0 || sieve.passant > inferiorLimit.value)
                        accumulate.inferiorLimit = {
                            value: sieve.passant,
                            index: index
                        };
                }
                return accumulate;
            }, {
                upperLimit: {
                    value: 0,
                    index: 0
                },
                inferiorLimit: {
                    value: 0,
                    index: 0
                }
            });
        };
    }
    calculateSucs({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate sucs on calc.sucs.service.ts > [body]');
                const classifications = sucs_classifications_1.default;
                const { sieves, liquidity_limit, plasticity_limit, organic_matter } = step2Data;
                const ip = liquidity_limit - plasticity_limit;
                const ip_condition = ip > (0.73 * (liquidity_limit - 20));
                const cnu = step2Data.cnu;
                const cc = step2Data.cc;
                const sucs_classification = classifications.find((classification) => ['sieve4', 'sieve200', 'liquidity_limit', 'organic_matter', 'ip_condition', 'cnu', 'cc'].every((field, ranges) => classification.validateParams(field, {
                    sieve4: sieves[0].passant,
                    sieve200: sieves[1].passant,
                    liquidity_limit: liquidity_limit,
                    organic_matter,
                    ip_condition,
                    cnu,
                    cc
                }, ranges)));
                const classification = sucs_classification.code;
                this.logger.log(ip);
                return {
                    success: true,
                    result: {
                        cc,
                        cnu,
                        ip,
                        classification,
                    }
                };
            }
            catch (error) {
                return {
                    success: false,
                    result: null
                };
            }
        });
    }
};
Calc_SUCS_Service = Calc_SUCS_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.SucsRepository, repository_2.SamplesRepository])
], Calc_SUCS_Service);
exports.Calc_SUCS_Service = Calc_SUCS_Service;
//# sourceMappingURL=calc.sucs.service.js.map