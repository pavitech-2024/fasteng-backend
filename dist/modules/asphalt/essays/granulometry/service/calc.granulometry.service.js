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
var Calc_AsphaltGranulometry_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_AsphaltGranulometry_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../materials/repository");
const sieves_1 = require("../../../../../modules/soils/util/sieves");
const repository_2 = require("../repository");
let Calc_AsphaltGranulometry_Service = Calc_AsphaltGranulometry_Service_1 = class Calc_AsphaltGranulometry_Service {
    constructor(granulometryRepository, materialsRepository) {
        this.granulometryRepository = granulometryRepository;
        this.materialsRepository = materialsRepository;
        this.logger = new common_1.Logger(Calc_AsphaltGranulometry_Service_1.name);
        this.getDiameter = (table_data, percentage, limits) => {
            if (limits.upperLimit.value === percentage) {
                return table_data[limits.upperLimit.index].passant;
            }
            if (limits.inferiorLimit.value === percentage) {
                return table_data[limits.inferiorLimit.index].passant;
            }
            const coefficientA = (limits.upperLimit.value - limits.inferiorLimit.value) /
                (table_data[limits.upperLimit.index].passant - table_data[limits.inferiorLimit.index].passant);
            const coefficientB = limits.upperLimit.value / (coefficientA * table_data[limits.upperLimit.index].passant);
            return (percentage - coefficientB) / coefficientA;
        };
        this.getPercentage = (percentage, table_data) => {
            return table_data.reduce((accumulate, sieve, index) => {
                if (sieve.passant >= percentage) {
                    if (accumulate.upperLimit.value === 0 || sieve.passant < accumulate.upperLimit.value)
                        accumulate.upperLimit = {
                            value: sieve.passant,
                            index: index,
                        };
                }
                else {
                    if (accumulate.inferiorLimit.value === 0 || sieve.passant > accumulate.inferiorLimit.value)
                        accumulate.inferiorLimit = {
                            value: sieve.passant,
                            index: index,
                        };
                }
                return accumulate;
            }, {
                upperLimit: {
                    value: 0,
                    index: 0,
                },
                inferiorLimit: {
                    value: 0,
                    index: 0,
                },
            });
        };
    }
    calculateGranulometry(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data, isSuperpave = true, }) {
            var _b;
            try {
                console.log('=== DEBUG CALCULATE GRANULOMETRY ===');
                console.log('table_data length:', (_b = step2Data.table_data) === null || _b === void 0 ? void 0 : _b.length);
                const { table_data, material_mass, bottom } = step2Data;
                const accumulated_retained = [];
                const passant = [];
                const retained_porcentage = [];
                const passant_porcentage = [];
                const graph_data = [];
                let total_retained = 0;
                let nominal_diameter = 0;
                let nominal_size = 0;
                let fineness_module = 0;
                let nominal_size_flag = true;
                let nominal_diameter_flag = true;
                for (let i = 0; i < table_data.length; i++) {
                    if (!table_data[i]) {
                        console.log(`❌ table_data[${i}] éhhh undefined!`);
                        continue;
                    }
                    const item = table_data[i];
                    const label = item.sieve_label;
                    const value = item.sieve_value;
                    const current_passant = item.passant;
                    const retained = item.retained;
                    if (label === undefined || value === undefined || current_passant === undefined || retained === undefined) {
                        console.log(`❌ Dados incompletos no item ${i}:`, item);
                        continue;
                    }
                    console.log(`✅ Processando item ${i}: ${label} - ${value}mm - ${current_passant}%`);
                    total_retained += retained;
                    passant.push([label, Math.round(100 * (material_mass - total_retained)) / 100]);
                    passant_porcentage.push([label, current_passant]);
                    accumulated_retained.push([label, Math.round(100 * (100 - current_passant)) / 100]);
                    if (i === 0) {
                        retained_porcentage.push(accumulated_retained[i]);
                    }
                    else {
                        retained_porcentage.push([
                            label,
                            Math.round(100 * (accumulated_retained[i][1] - accumulated_retained[i - 1][1])) / 100,
                        ]);
                    }
                    fineness_module += accumulated_retained[i][1];
                    if (nominal_size_flag && accumulated_retained[i][1] >= 5) {
                        nominal_size_flag = false;
                        if (i === 0) {
                            nominal_size = (0, sieves_1.getSieveValue)(label, isSuperpave);
                        }
                        else {
                            const previous_retained = accumulated_retained[i - 1][1];
                            nominal_size = previous_retained <= 5 ? (0, sieves_1.getSieveValue)(table_data[i - 1].sieve_label) : (0, sieves_1.getSieveValue)(label);
                        }
                    }
                    if (total_retained > 10 && nominal_diameter_flag) {
                        nominal_diameter_flag = false;
                        nominal_diameter = (0, sieves_1.getSieveValue)(table_data[i].sieve_label, isSuperpave);
                    }
                    graph_data.push([value, current_passant]);
                }
                if (graph_data.length === 0) {
                    throw new Error('Nenhum dado válido foi processado');
                }
                fineness_module = Math.round((100 * fineness_module) / 100) / 100;
                total_retained = Math.round(100 * total_retained) / 100;
                const error = Math.round((100 * (material_mass - total_retained - bottom) * 100) / material_mass) / 100;
                let cnu = 0;
                let cc = 0;
                try {
                    const limit_10 = this.getPercentage(10, table_data);
                    const limit_30 = this.getPercentage(30, table_data);
                    const limit_60 = this.getPercentage(60, table_data);
                    const diameter10 = this.getDiameter(table_data, 10, limit_10);
                    const diameter30 = this.getDiameter(table_data, 30, limit_30);
                    const diameter60 = this.getDiameter(table_data, 60, limit_60);
                    cnu = Math.round((100 * diameter60) / diameter10) / 100;
                    cc = Math.round((100 * Math.pow(diameter30, 2)) / (diameter60 * diameter10)) / 100;
                }
                catch (calcError) {
                    console.log('❌ Erro no cálculo de CC/CNU:', calcError);
                }
                return {
                    success: true,
                    result: {
                        accumulated_retained,
                        graph_data,
                        passant,
                        retained_porcentage,
                        passant_porcentage,
                        total_retained,
                        nominal_diameter,
                        nominal_size,
                        fineness_module,
                        cc,
                        cnu,
                        error,
                    },
                };
            }
            catch (error) {
                console.error('❌ ERRO CRÍTICO NO CALCULATE GRANULOMETRY:', error);
                this.logger.error(`error on calculate asphalt granulometry > [error]: ${error}`);
                return {
                    success: false,
                    result: null,
                };
            }
        });
    }
};
exports.Calc_AsphaltGranulometry_Service = Calc_AsphaltGranulometry_Service;
exports.Calc_AsphaltGranulometry_Service = Calc_AsphaltGranulometry_Service = Calc_AsphaltGranulometry_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.AsphaltGranulometryRepository,
        repository_1.MaterialsRepository])
], Calc_AsphaltGranulometry_Service);
//# sourceMappingURL=calc.granulometry.service.js.map