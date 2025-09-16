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
var Calc_GRANULOMETRY_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_GRANULOMETRY_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/soils/samples/repository");
const sieves_1 = require("../../../../../modules/soils/util/sieves");
let Calc_GRANULOMETRY_Service = Calc_GRANULOMETRY_Service_1 = class Calc_GRANULOMETRY_Service {
    constructor(granulometryRepository, sampleRepository) {
        this.granulometryRepository = granulometryRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(Calc_GRANULOMETRY_Service_1.name);
        this.getDiameter = (table_data, percentage, limits) => {
            if (limits.upperLimit.value === percentage)
                return table_data[limits.upperLimit.index].passant;
            if (limits.inferiorLimit.value === percentage)
                return table_data[limits.inferiorLimit.index].passant;
            const coefficientA = (limits.upperLimit.value - limits.inferiorLimit.value) /
                (table_data[limits.upperLimit.index].passant - table_data[limits.inferiorLimit.index].passant);
            const coefficientB = limits.upperLimit.value / (coefficientA * table_data[limits.upperLimit.index].passant);
            return (percentage - coefficientB) / coefficientA;
        };
        this.getPercentage = (percentage, table_data) => {
            return table_data.reduce((accumulate, sieve, index) => {
                const { upperLimit, inferiorLimit } = accumulate;
                console.log('sieve.passant >= percentage', sieve.passant >= percentage);
                console.log(sieve.passant);
                if (sieve.passant >= percentage) {
                    if (upperLimit.value === 0 || sieve.passant < upperLimit.value)
                        accumulate.upperLimit = {
                            value: sieve.passant,
                            index: index,
                        };
                }
                else {
                    if (inferiorLimit.value === 0 || sieve.passant > inferiorLimit.value)
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
    calculateGranulometry({ step2Data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate granulometry on calc.granulometry.service.ts > [body]');
                const { table_data, sample_mass, bottom } = step2Data;
                const length = table_data.length;
                const accumulated_retained = [];
                const passant = [];
                const retained_porcentage = [];
                const graph_data = [];
                let total_retained = 0;
                let nominal_diameter = 0;
                let nominal_size = 0;
                let fineness_module = 0;
                let nominal_size_flag = true;
                let nominal_diameter_flag = true;
                for (let i = 0; i < length; i++) {
                    const label = table_data[i].sieve;
                    const passant_porcentage = table_data[i].passant;
                    const retained = table_data[i].retained;
                    total_retained += retained;
                    passant.push(Math.round(100 * (sample_mass - total_retained)) / 100);
                    accumulated_retained.push(Math.round(100 * (100 - passant_porcentage)) / 100);
                    if (i === 0) {
                        retained_porcentage.push(accumulated_retained[i]);
                    }
                    else {
                        retained_porcentage.push(Math.round(100 * (accumulated_retained[i] - accumulated_retained[i - 1])) / 100);
                    }
                    fineness_module += accumulated_retained[i];
                    if (total_retained >= 5 && nominal_size_flag) {
                        nominal_size_flag = false;
                        if (total_retained === 5)
                            nominal_size = (0, sieves_1.getSieveValue)(label);
                        else {
                            if (i === 0)
                                nominal_size = (0, sieves_1.getSieveValue)(label);
                            else
                                nominal_size = (0, sieves_1.getSieveValue)(table_data[i - 1].sieve);
                        }
                    }
                    if (total_retained > 10 && nominal_diameter_flag) {
                        nominal_diameter_flag = false;
                        if (i === 1)
                            nominal_diameter = (0, sieves_1.getSieveValue)(label);
                        else
                            nominal_diameter = (0, sieves_1.getSieveValue)(table_data[i - 1].sieve);
                    }
                    graph_data.push([(0, sieves_1.getSieveValue)(label), passant_porcentage]);
                }
                fineness_module = Math.round((100 * fineness_module) / 100) / 100;
                total_retained = Math.round(100 * total_retained) / 100;
                const error = Math.round((100 * (sample_mass - total_retained - bottom) * 100) / sample_mass) / 100;
                const limit_10 = this.getPercentage(10, table_data);
                const limit_30 = this.getPercentage(30, table_data);
                const limit_60 = this.getPercentage(60, table_data);
                console.log(limit_10);
                console.log(limit_30);
                console.log(limit_60);
                const diameter10 = this.getDiameter(table_data, 10, limit_10);
                const diameter30 = this.getDiameter(table_data, 30, limit_30);
                const diameter60 = this.getDiameter(table_data, 60, limit_60);
                console.log(diameter10);
                console.log(diameter30);
                console.log(diameter60);
                const cnu = Math.round((100 * diameter60) / diameter10) / 100;
                const cc = Math.round((100 * Math.pow(diameter30, 2)) / (diameter60 * diameter10)) / 100;
                return {
                    success: true,
                    result: {
                        accumulated_retained,
                        graph_data,
                        passant,
                        retained_porcentage,
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
                return {
                    success: false,
                    result: null,
                };
            }
        });
    }
};
Calc_GRANULOMETRY_Service = Calc_GRANULOMETRY_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.GranulometryRepository,
        repository_2.SamplesRepository])
], Calc_GRANULOMETRY_Service);
exports.Calc_GRANULOMETRY_Service = Calc_GRANULOMETRY_Service;
//# sourceMappingURL=calc.granulometry.service.js.map