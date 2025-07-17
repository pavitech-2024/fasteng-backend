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
var SecondCompressionParameters_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondCompressionParameters_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
let SecondCompressionParameters_Superpave_Service = SecondCompressionParameters_Superpave_Service_1 = class SecondCompressionParameters_Superpave_Service {
    constructor(superpaveModel, superpave_repository) {
        this.superpaveModel = superpaveModel;
        this.superpave_repository = superpave_repository;
        this.logger = new common_1.Logger(SecondCompressionParameters_Superpave_Service_1.name);
    }
    getStep9Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this;
                this.logger.log({}, 'start get step 8 Data > SecondCompressionPercentage_Superpave_Service');
                const { expectedPli, composition } = body;
                const PolynomialRegression = require('ml-regression-polynomial');
                const { quadSolver } = require('quadratic-solver');
                const Pli = expectedPli;
                const dataVv = [
                    composition.halfLess.Vv,
                    composition.normal.Vv,
                    composition.halfPlus.Vv,
                    composition.onePlus.Vv,
                ];
                const dataPli = [Pli - 0.5, Pli, Pli + 0.5, Pli + 1];
                const regression = new PolynomialRegression(dataPli, dataVv, 2);
                const optimumContent = quadSolver(regression.coefficients[2], regression.coefficients[1], regression.coefficients[0] - 4)[1];
                const graphVv = [
                    ['Teor', 'Vv'],
                    [
                        Pli - 0.5,
                        regression.coefficients[2] * Math.pow(Pli - 0.5, 2) +
                            regression.coefficients[1] * (Pli - 0.5) +
                            regression.coefficients[0],
                    ],
                    [
                        Pli,
                        regression.coefficients[2] * Math.pow(Pli, 2) + regression.coefficients[1] * Pli + regression.coefficients[0],
                    ],
                    [
                        Pli + 0.5,
                        regression.coefficients[2] * Math.pow(Pli + 0.5, 2) +
                            regression.coefficients[1] * (Pli + 0.5) +
                            regression.coefficients[0],
                    ],
                    [
                        Pli + 1,
                        regression.coefficients[2] * Math.pow(Pli + 1, 2) +
                            regression.coefficients[1] * (Pli + 1) +
                            regression.coefficients[0],
                    ],
                ];
                const graphVam = [
                    ['Teor', 'Vam'],
                    [Pli - 0.5, composition.halfLess.Vam],
                    [Pli, composition.normal.Vam],
                    [Pli + 0.5, composition.halfPlus.Vam],
                    [Pli + 1, composition.onePlus.Vam],
                ];
                const graphGmb = [
                    ['Teor', 'Gmb'],
                    [Pli - 0.5, composition.halfLess.projectN.gmb],
                    [Pli, composition.normal.projectN.gmb],
                    [Pli + 0.5, composition.halfPlus.projectN.gmb],
                    [Pli + 1, composition.onePlus.projectN.gmb],
                ];
                const graphGmm = [
                    ['Teor', 'Gmm'],
                    [Pli - 0.5, composition.halfLess.gmm],
                    [Pli, composition.normal.gmm],
                    [Pli + 0.5, composition.halfPlus.gmm],
                    [Pli + 1, composition.onePlus.gmm],
                ];
                const graphRBV = [
                    ['Teor', 'RBV'],
                    [Pli - 0.5, composition.halfLess.RBV],
                    [Pli, composition.normal.RBV],
                    [Pli + 0.5, composition.halfPlus.RBV],
                    [Pli + 1, composition.onePlus.RBV],
                ];
                const graphPA = [
                    ['Teor', 'P/A'],
                    [Pli - 0.5, composition.halfLess.ratioDustAsphalt],
                    [Pli, composition.normal.ratioDustAsphalt],
                    [Pli + 0.5, composition.halfPlus.ratioDustAsphalt],
                    [Pli + 1, composition.onePlus.ratioDustAsphalt],
                ];
                let halfLessPointOfRT;
                let normalPointOfRT;
                let halfPlusPointOfRT;
                let onePlusPointOfRT;
                if (composition.halfLess.indirectTensileStrength !== undefined) {
                    halfLessPointOfRT = composition.halfLess.indirectTensileStrength;
                }
                else
                    halfLessPointOfRT = null;
                if (composition.normal.indirectTensileStrength !== undefined) {
                    normalPointOfRT = composition.normal.indirectTensileStrength;
                }
                else
                    normalPointOfRT = null;
                if (composition.halfPlus.indirectTensileStrength !== undefined) {
                    halfPlusPointOfRT = composition.halfPlus.indirectTensileStrength;
                }
                else
                    halfPlusPointOfRT = null;
                if (composition.onePlus.indirectTensileStrength !== undefined) {
                    onePlusPointOfRT = composition.onePlus.indirectTensileStrength;
                }
                else
                    onePlusPointOfRT = null;
                const graphRT = [
                    ['Teor', 'RT'],
                    [Pli - 0.5, halfLessPointOfRT],
                    [Pli, normalPointOfRT],
                    [Pli + 0.5, halfPlusPointOfRT],
                    [Pli + 1, onePlusPointOfRT],
                ];
                const graphs = {
                    graphVv,
                    graphVam,
                    graphGmb,
                    graphGmm,
                    graphRBV,
                    graphPA,
                    graphRT,
                };
                return { optimumContent, graphs };
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep9Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave second compression percentages step on second-compression-percentages.superpave.service.ts > [body]', { body });
                const { name } = body.secondCompressionParams;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.secondCompressionParams, { name: materialName } = _a, secondCompressionParamsWithoutName = __rest(_a, ["name"]);
                const superpaveWithSecondCompressionParams = Object.assign(Object.assign({}, superpaveExists._doc), { secondCompressionParams: secondCompressionParamsWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithSecondCompressionParams);
                if (superpaveExists._doc.generalData.step < 9) {
                    yield this.superpave_repository.saveStep(superpaveExists, 9);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.SecondCompressionParameters_Superpave_Service = SecondCompressionParameters_Superpave_Service;
exports.SecondCompressionParameters_Superpave_Service = SecondCompressionParameters_Superpave_Service = SecondCompressionParameters_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.SuperpaveRepository])
], SecondCompressionParameters_Superpave_Service);
//# sourceMappingURL=second-compression-parameters.service.js.map