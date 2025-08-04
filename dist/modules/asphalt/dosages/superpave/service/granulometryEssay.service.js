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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var GranulometryEssay_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryEssay_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const sieves_1 = require("../../../../soils/util/sieves");
const repository_1 = require("../repository");
let GranulometryEssay_Superpave_Service = GranulometryEssay_Superpave_Service_1 = class GranulometryEssay_Superpave_Service {
    constructor(superpaveModel, superpave_repository) {
        this.superpaveModel = superpaveModel;
        this.superpave_repository = superpave_repository;
        this.logger = new common_1.Logger(GranulometryEssay_Superpave_Service_1.name);
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
    calculateGranulometryEssay(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate granulometry essay data on granulometry-essay.superpave.service.ts > [body]', {
                    body,
                });
                const { table_data, material_mass, bottom } = body;
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
                    const label = table_data[i].sieve_label;
                    const value = table_data[i].sieve_value;
                    const passant_porcentage = table_data[i].passant;
                    const retained = table_data[i].retained;
                    total_retained += retained;
                    passant.push([label, Math.round(100 * (material_mass - total_retained)) / 100]);
                    accumulated_retained.push([label, Math.round(100 * (100 - passant_porcentage)) / 100]);
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
                    if (total_retained >= 5 && nominal_size_flag) {
                        nominal_size_flag = false;
                        if (total_retained === 5)
                            nominal_size = (0, sieves_1.getSieveValue)(label);
                        else {
                            if (i === 0)
                                nominal_size = (0, sieves_1.getSieveValue)(label);
                            else
                                nominal_size = (0, sieves_1.getSieveValue)(table_data[i - 1].sieve_label, true);
                        }
                    }
                    if (total_retained > 10 && nominal_diameter_flag) {
                        nominal_diameter_flag = false;
                        if (i === 1)
                            nominal_diameter = (0, sieves_1.getSieveValue)(label, true);
                        else if (i === 0)
                            nominal_diameter = value;
                        else
                            nominal_diameter = (0, sieves_1.getSieveValue)(table_data[i - 1].sieve_label, true);
                    }
                    graph_data.push([value, passant_porcentage]);
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
                throw new Error('Failed to calculate granulometry essay.');
            }
        });
    }
    saveGranulometryEssayData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave materials data on material-selection.superpave.service.ts > [body]', { body });
                const { name } = body.granulometryEssayData;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.granulometryEssayData, { name: materialName } = _a, materialDataWithoutName = __rest(_a, ["name"]);
                const superpaveWithMaterials = Object.assign(Object.assign({}, superpaveExists._doc), { granulometryEssayData: materialDataWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);
                if (superpaveExists._doc.generalData.step < 1) {
                    yield this.superpave_repository.saveStep(superpaveExists, 1);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveGranulometryEssayResults(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave materials results on material-selection.superpave.service.ts > [body]', { body });
                const { name } = body.granulometryEssayResults;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.granulometryEssayResults, { name: materialName } = _a, materialDataWithoutName = __rest(_a, ["name"]);
                const superpaveWithMaterials = Object.assign(Object.assign({}, superpaveExists._doc), { granulometryEssayResults: materialDataWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);
                if (superpaveExists._doc.generalData.step < 2) {
                    yield this.superpave_repository.saveStep(superpaveWithMaterials, 2);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GranulometryEssay_Superpave_Service = GranulometryEssay_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.SuperpaveRepository])
], GranulometryEssay_Superpave_Service);
exports.GranulometryEssay_Superpave_Service = GranulometryEssay_Superpave_Service;
//# sourceMappingURL=granulometryEssay.service.js.map