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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimumBinderContent_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const _1 = require(".");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
let OptimumBinderContent_Marshall_Service = class OptimumBinderContent_Marshall_Service {
    constructor(marshallModel, marshallRepository) {
        this.marshallModel = marshallModel;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(_1.MarshallService.name);
    }
    setOptimumBinderContentData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('set graphs on optimum-binder.marshall.service.ts > [body]', {
                body,
            });
            try {
                const { volumetricParametersData } = body;
                const { volumetricParameters } = volumetricParametersData;
                const graphics = {
                    rbv: [['Teor', 'Rbv']],
                    vv: [['Teor', 'Vv']],
                    sg: [['Teor', 'SpecificGravity']],
                    gmb: [['Teor', 'Gmb']],
                    stability: [['Teor', 'Stability']],
                    vam: [['Teor', 'Vam']],
                };
                volumetricParameters.forEach(({ asphaltContent, values }) => {
                    graphics.rbv.push([asphaltContent, values.ratioBitumenVoid * 100]);
                    graphics.vv.push([asphaltContent, values.volumeVoids * 100]);
                    graphics.sg.push([asphaltContent, values.maxSpecificGravity]);
                    graphics.gmb.push([asphaltContent, values.apparentBulkSpecificGravity]);
                    graphics.stability.push([asphaltContent, values.stability]);
                    graphics.vam.push([asphaltContent, values.aggregateVolumeVoids * 100]);
                });
                return graphics;
            }
            catch (error) {
                throw new Error('Failed to set optimum binder content graphs.');
            }
        });
    }
    plotDosageGraph(dnitBands, volumetricParameters, binderTrial, percentsOfDosage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('set dosage graph on optimum-binder.marshall.service.ts > [body]', {
                    dnitBands,
                    volumetricParameters,
                    binderTrial,
                });
                const { pointsOfCurveDosageRBV, pointsOfCurveDosageVv } = volumetricParameters;
                const trialAsphaltContent = binderTrial;
                const pointsOfCurveDosage = [];
                let minBandVv;
                let maxBandVv;
                let minBandRBV;
                let maxBandRBV;
                if (dnitBands === 'A') {
                    minBandVv = 0.04;
                    maxBandVv = 0.6;
                    minBandRBV = 0.65;
                    maxBandRBV = 0.72;
                }
                else if (dnitBands === 'B' || dnitBands === 'C') {
                    minBandVv = 0.03;
                    maxBandVv = 0.5;
                    minBandRBV = 0.75;
                    maxBandRBV = 0.82;
                }
                const curveRBV = this.calculateEquationRBV(pointsOfCurveDosageRBV);
                const curveVv = this.calculateEquationVv(pointsOfCurveDosageVv);
                const pushData = (asphaltContent) => {
                    pointsOfCurveDosage.push([
                        asphaltContent,
                        this.calculateVv(asphaltContent, curveVv) * 100,
                        this.calculateRBV(asphaltContent, curveRBV) * 100,
                    ]);
                };
                [-1, -0.5, 0, 0.5, 1].forEach((increment) => pushData(trialAsphaltContent + increment));
                const optimumContent = this.calculateVv4(trialAsphaltContent - 1, this.calculateVv(trialAsphaltContent - 1, curveVv), trialAsphaltContent - 0.5, this.calculateVv(trialAsphaltContent - 0.5, curveVv));
                const confirmedPercentsOfDosage = yield this.confirmPercentsOfDosage(percentsOfDosage, optimumContent);
                return {
                    pointsOfCurveDosage,
                    optimumContent: this.calculateVv4(trialAsphaltContent - 1, this.calculateVv(trialAsphaltContent - 1, curveVv), trialAsphaltContent - 0.5, this.calculateVv(trialAsphaltContent - 0.5, curveVv)),
                    confirmedPercentsOfDosage,
                    curveRBV,
                    curveVv
                };
            }
            catch (error) {
                throw new Error('Failed to set optimum binder dosage graph.');
            }
        });
    }
    confirmPercentsOfDosage(percentageInputs, optimumContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const ids1 = new Set();
            const percentsOfDosage = [];
            Object.keys(percentageInputs[0]).forEach(key => {
                const id = key.split('_')[1];
                ids1.add(id);
                const value = percentageInputs[0][key];
                const index = Array.from(ids1).indexOf(id);
                percentsOfDosage[index] = value;
            });
            const confirmedPercentsOfDosage = percentsOfDosage.map(percent => (100 - optimumContent) * (percent / 100));
            return confirmedPercentsOfDosage;
        });
    }
    getExpectedParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { percentsOfDosage, optimumContent, maxSpecificGravity, listOfSpecificGravities, trial: trialAsphaltContent, confirmedPercentsOfDosage, curveVv, curveRBV } = body;
                let newMaxSpecificGravity;
                let formattedPercentsOfDosage = [];
                const ids1 = new Set();
                Object.keys(percentsOfDosage[0]).forEach(key => {
                    const id = key.split('_')[1];
                    ids1.add(id);
                    const value = percentsOfDosage[0][key];
                    const index = Array.from(ids1).indexOf(id);
                    formattedPercentsOfDosage[index] = value;
                });
                if (maxSpecificGravity.method === 'GMM') {
                    const GMMs = [
                        maxSpecificGravity.results.lessOne,
                        maxSpecificGravity.results.lessHalf,
                        maxSpecificGravity.results.normal,
                        maxSpecificGravity.results.plusHalf,
                        maxSpecificGravity.results.plusOne,
                    ];
                    const Contents = [
                        trialAsphaltContent - 1,
                        trialAsphaltContent - 0.5,
                        trialAsphaltContent,
                        trialAsphaltContent + 0.5,
                        trialAsphaltContent + 1,
                    ];
                    const data = GMMs.map((gmm, i) => {
                        if (gmm)
                            return { x: Contents[i], y: gmm };
                        else
                            return;
                    });
                    const coefficients = this.calculateEquation(data);
                    newMaxSpecificGravity = coefficients.a * optimumContent + coefficients.b;
                }
                else {
                    const denominator = formattedPercentsOfDosage.reduce((acc, percent, i) => (acc += confirmedPercentsOfDosage[i] / listOfSpecificGravities[i]), 0);
                    newMaxSpecificGravity = 100 / (denominator + (optimumContent / 1.03));
                }
                const Vv = this.calculateVv(optimumContent, curveVv);
                const Gmb = newMaxSpecificGravity * (1 - Vv);
                let Vcb = (Gmb * optimumContent) / 1.027;
                const RBV = this.calculateRBV(optimumContent, curveRBV);
                const Vam = (Vv * 100 + Vcb) / 100;
                return { Vv, RBV, Vam, Gmb, newMaxSpecificGravity };
            }
            catch (error) {
                throw new Error('Failed to set optimum binder expected parameters.');
            }
        });
    }
    calculateContentVv(y, curveVv) {
        return (y - curveVv.b) / curveVv.a;
    }
    calculateContentRBV(y, curveRBV) {
        return (y - curveRBV.b) / curveRBV.a;
    }
    calculateVv(x, curveVv) {
        return curveVv.a * x + curveVv.b;
    }
    calculateRBV(x, curveRBV) {
        return curveRBV.a * x + curveRBV.b;
    }
    calculateEquationVv(data) {
        let curveVv = { a: null, b: null };
        curveVv.a =
            (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
                (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
        curveVv.b = this.yBar(data) - curveVv.a * this.xBar(data);
        return curveVv;
    }
    calculateEquationRBV(data) {
        let curveRBV = { a: null, b: null };
        curveRBV.a =
            (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
                (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
        curveRBV.b = this.yBar(data) - curveRBV.a * this.xBar(data);
        return curveRBV;
    }
    calculateEquation(data) {
        const a = (data.length * this.sumXY(data) - this.sumX(data) * this.sumY(data)) /
            (data.length * this.sumPow2X(data) - this.Pow2SumX(data));
        const b = this.yBar(data) - a * this.xBar(data);
        return { a, b };
    }
    calculateVv4(x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        return ((0.04 - y1) / m) + x1;
    }
    sumXY(data) {
        return data.reduce((acc, obj) => {
            return acc + obj.x * obj.y;
        }, 0);
    }
    sumX(data) {
        return data.reduce((acc, obj) => acc + obj.x, 0);
    }
    sumY(data) {
        return data.reduce((acc, obj) => acc + obj.y, 0);
    }
    sumPow2X(data) {
        return data.reduce((acc, obj) => acc + Math.pow(obj.x, 2), 0);
    }
    Pow2SumX(data) {
        const sumX = this.sumX(data);
        return Math.pow(sumX, 2);
    }
    yBar(data) {
        const sumY = this.sumY(data);
        return sumY / data.length;
    }
    xBar(data) {
        const sumX = this.sumX(data);
        return sumX / data.length;
    }
    saveStep7Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall optimum binder content step on optimum-binder.marshall.service.ts > [body]', {
                    body,
                });
                const { name } = body.optimumBinderContentData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.optimumBinderContentData, { name: materialName } = _a, optimumBinderContentWithoutName = __rest(_a, ["name"]);
                const marshallWithOptimumBinderContent = Object.assign(Object.assign({}, marshallExists._doc), { optimumBinderContentData: optimumBinderContentWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithOptimumBinderContent);
                if (marshallExists._doc.generalData.step < 7) {
                    yield this.marshallRepository.saveStep(marshallExists, 7);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
OptimumBinderContent_Marshall_Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MarshallRepository])
], OptimumBinderContent_Marshall_Service);
exports.OptimumBinderContent_Marshall_Service = OptimumBinderContent_Marshall_Service;
//# sourceMappingURL=optimum-binder.marshall.service.js.map