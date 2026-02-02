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
const repository_2 = require("../repository");
let Calc_AsphaltGranulometry_Service = Calc_AsphaltGranulometry_Service_1 = class Calc_AsphaltGranulometry_Service {
    constructor(granulometryRepository, materialsRepository) {
        this.granulometryRepository = granulometryRepository;
        this.materialsRepository = materialsRepository;
        this.logger = new common_1.Logger(Calc_AsphaltGranulometry_Service_1.name);
        this.getDiameter = (table_data, percentage, limits) => {
            if (!table_data || table_data.length === 0) {
                console.error('Invalid table_data');
                return 0;
            }
            if (limits.upperLimit.value === limits.inferiorLimit.value) {
                console.log('Limits are equal, returning:', limits.upperLimit.value);
                return limits.upperLimit.value;
            }
            if (limits.upperLimit.index < 0 || limits.upperLimit.index >= table_data.length ||
                limits.inferiorLimit.index < 0 || limits.inferiorLimit.index >= table_data.length) {
                console.error('Invalid limit indices');
                return 0;
            }
            const upperItem = table_data[limits.upperLimit.index];
            const inferiorItem = table_data[limits.inferiorLimit.index];
            if (limits.upperLimit.value === percentage) {
                console.log('Upper limit matches percentage');
                return upperItem.passant;
            }
            if (limits.inferiorLimit.value === percentage) {
                console.log('Inferior limit matches percentage');
                return inferiorItem.passant;
            }
            if (upperItem.passant === inferiorItem.passant) {
                console.error('Cannot calculate: equal passant values');
                const weight = (percentage - limits.inferiorLimit.value) / (limits.upperLimit.value - limits.inferiorLimit.value);
                const result = inferiorItem.passant + (upperItem.passant - inferiorItem.passant) * weight;
                console.log('Using weighted interpolation, result:', result);
                return result;
            }
            const coefficientA = (limits.upperLimit.value - limits.inferiorLimit.value) /
                (upperItem.passant - inferiorItem.passant);
            const coefficientB = limits.upperLimit.value / (coefficientA * upperItem.passant);
            const result = (percentage - coefficientB) / coefficientA;
            console.log('Result:', result);
            return result;
        };
        this.getPercentage = (percentage, table_data) => {
            let upperLimit = { value: Infinity, index: -1 };
            let inferiorLimit = { value: -Infinity, index: -1 };
            for (let i = 0; i < table_data.length; i++) {
                const passantValue = table_data[i].passant;
                if (passantValue >= percentage && passantValue < upperLimit.value) {
                    upperLimit = { value: passantValue, index: i };
                }
            }
            for (let i = 0; i < table_data.length; i++) {
                const passantValue = table_data[i].passant;
                if (passantValue < percentage &&
                    passantValue > inferiorLimit.value &&
                    i !== upperLimit.index) {
                    inferiorLimit = { value: passantValue, index: i };
                }
            }
            if (inferiorLimit.index === -1) {
                for (let i = 0; i < table_data.length; i++) {
                    if (i !== upperLimit.index && table_data[i].passant !== upperLimit.value) {
                        inferiorLimit = { value: table_data[i].passant, index: i };
                        break;
                    }
                }
            }
            if (inferiorLimit.index === -1) {
                for (let i = table_data.length - 1; i >= 0; i--) {
                    if (i !== upperLimit.index) {
                        inferiorLimit = { value: table_data[i].passant, index: i };
                        break;
                    }
                }
            }
            if (inferiorLimit.index === -1 || inferiorLimit.value === upperLimit.value) {
                if (upperLimit.index === 0 && table_data.length > 1) {
                    inferiorLimit = { value: table_data[1].passant, index: 1 };
                }
                else if (upperLimit.index === table_data.length - 1 && table_data.length > 1) {
                    inferiorLimit = { value: table_data[table_data.length - 2].passant, index: table_data.length - 2 };
                }
                else if (upperLimit.index > 0) {
                    inferiorLimit = { value: table_data[upperLimit.index - 1].passant, index: upperLimit.index - 1 };
                }
            }
            return { upperLimit, inferiorLimit };
        };
    }
    calculateGranulometry(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data, isSuperpave = true, }) {
            try {
                this.logger.log(`calculate asphalt granulometry on calc.granulometry.service.ts > [${isSuperpave ? 'Superpave' : 'Granulometry'}]`);
                const { table_data, material_mass, bottom } = step2Data;
                const length = table_data.length;
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
                for (let i = 0; i < length; i++) {
                    const label = table_data[i].sieve_label;
                    const value = table_data[i].sieve_value;
                    const currentPassant = table_data[i].passant;
                    const retained = table_data[i].retained;
                    passant_porcentage.push([label, currentPassant]);
                    total_retained += retained;
                    passant.push([label, Math.round(100 * (material_mass - total_retained)) / 100]);
                    accumulated_retained.push([label, Math.round(100 * (100 - currentPassant)) / 100]);
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
                    if (nominal_size_flag && (accumulated_retained[i][1] > 10 || currentPassant < 90)) {
                        nominal_size_flag = false;
                        if (i > 0) {
                            nominal_size = table_data[i - 1].sieve_value;
                        }
                        else {
                            nominal_size = value;
                        }
                    }
                    graph_data.push([value, currentPassant]);
                }
                let max_dimension_found = false;
                for (let i = length - 1; i >= 0; i--) {
                    if (table_data[i].passant === 100) {
                        nominal_diameter = table_data[i].sieve_value;
                        max_dimension_found = true;
                        break;
                    }
                }
                if (!max_dimension_found) {
                    nominal_diameter = 0;
                }
                fineness_module = Math.round((100 * fineness_module) / 100) / 100;
                total_retained = Math.round(100 * total_retained) / 100;
                const error = Math.round((100 * (material_mass - total_retained - bottom) * 100) / material_mass) / 100;
                const limit_10 = this.getPercentage(10, table_data);
                const limit_30 = this.getPercentage(30, table_data);
                const limit_60 = this.getPercentage(60, table_data);
                const diameter10 = this.getDiameter(table_data, 10, limit_10);
                const diameter30 = this.getDiameter(table_data, 30, limit_30);
                const diameter60 = this.getDiameter(table_data, 60, limit_60);
                const cnu = diameter10 > 0 ? Math.round((100 * diameter60) / diameter10) / 100 : 0;
                const cc = (diameter60 * diameter10) > 0 ? Math.round((100 * Math.pow(diameter30, 2)) / (diameter60 * diameter10)) / 100 : 0;
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