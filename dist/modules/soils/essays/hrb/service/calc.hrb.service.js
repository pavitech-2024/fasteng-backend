"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var Calc_HRB_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_HRB_Service = void 0;
const common_1 = require("@nestjs/common");
const hrb_classifications_1 = require("../utils/hrb-classifications");
let Calc_HRB_Service = Calc_HRB_Service_1 = class Calc_HRB_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_HRB_Service_1.name);
        this.calculateHrb = ({ step2Data }) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate hrb on calc.hrb.service.ts > [body]');
                const classifications = hrb_classifications_1.default;
                const { tableData, liquidity_limit, plasticity_limit } = step2Data;
                const plasticity_index = liquidity_limit - plasticity_limit;
                const group_index = this.calculate_group_index({
                    liquidity_limit,
                    sieve200: tableData[2].percent_passant,
                    plasticity_index,
                });
                let hrb_classification = classifications.find((classification) => ['sieve10', 'sieve40', 'sieve200', 'liquidity_limit', 'plasticity_index', 'group_index'].every((field) => classification.validateParams(field, {
                    sieve10: tableData[0].percent_passant,
                    sieve40: tableData[1].percent_passant,
                    sieve200: tableData[2].percent_passant,
                    liquidity_limit: liquidity_limit,
                    plasticity_index,
                    group_index,
                })));
                if (hrb_classification.code === 'A-7-5' && plasticity_index > liquidity_limit - 30)
                    hrb_classification = classifications[classifications.length - 1];
                const classification = hrb_classification.code;
                return {
                    success: true,
                    result: {
                        classification,
                        plasticity_index,
                        group_index,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
        this.calculate_group_index = ({ liquidity_limit, sieve200, plasticity_index }) => {
            const p = sieve200;
            const a = p > 75 ? 75 - 35 : p < 35 ? 35 - 35 : p - 35;
            const b = p > 55 ? 55 - 15 : p < 15 ? 15 - 15 : p - 15;
            const c = liquidity_limit > 60 ? 60 - 40 : liquidity_limit < 40 ? 40 - 40 : liquidity_limit - 40;
            const d = plasticity_index > 30 ? 30 - 10 : plasticity_index < 10 ? 10 - 10 : plasticity_index - 10;
            return Math.ceil(0.2 * a + 0.005 * a * c + 0.01 * b * d);
        };
    }
};
Calc_HRB_Service = Calc_HRB_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_HRB_Service);
exports.Calc_HRB_Service = Calc_HRB_Service;
//# sourceMappingURL=calc.hrb.service.js.map