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
var GranulometryComposition_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryComposition_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../essays/granulometry/repository");
const interfaces_1 = require("../../../../../utils/interfaces");
const schemas_1 = require("../schemas");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const repository_2 = require("../repository");
const mongoose_2 = require("mongoose");
const CANON_AXIS = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];
let GranulometryComposition_Superpave_Service = GranulometryComposition_Superpave_Service_1 = class GranulometryComposition_Superpave_Service {
    constructor(superpaveModel, superpaveRepository, granulometry_repository) {
        this.superpaveModel = superpaveModel;
        this.superpaveRepository = superpaveRepository;
        this.granulometry_repository = granulometry_repository;
        this.logger = new common_1.Logger(GranulometryComposition_Superpave_Service_1.name);
    }
    getGranulometryData(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const granulometry_data = [];
                const granulometrys = yield this.granulometry_repository.findAll();
                aggregates.forEach((aggregate) => {
                    const granulometry = granulometrys.find(({ generalData }) => aggregate._id.toString() === generalData.material._id.toString());
                    const passants = Object.fromEntries(granulometry.results.passant);
                    granulometry_data.push({
                        _id: aggregate._id,
                        passants,
                    });
                });
                const table_column_headers = ['sieve_label'];
                const table_rows = [];
                const sievesByDiameter = [...interfaces_1.AllSieves].sort((a, b) => Number(b.value) - Number(a.value));
                sievesByDiameter.forEach((sieve) => {
                    const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);
                    if (!contains)
                        return;
                    const aggregates_data = {};
                    granulometry_data.forEach((aggregate) => {
                        const { _id, passants } = aggregate;
                        aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label];
                        aggregates_data['passant_'.concat(_id)] = null;
                        if (!table_column_headers.some((header) => header.includes(_id))) {
                            table_column_headers.push('total_passant_'.concat(_id));
                            table_column_headers.push('passant_'.concat(_id));
                        }
                    });
                    table_rows.push(Object.assign({ sieve_label: sieve.label }, aggregates_data));
                });
                return { table_column_headers, table_rows };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            try {
                const { chosenCurves, percentageInputs: percentsOfDosage, percentsToList, dnitBand, materials, nominalSize, } = body;
                const labels = ((_a = percentsToList === null || percentsToList === void 0 ? void 0 : percentsToList[0]) !== null && _a !== void 0 ? _a : []).map((point) => Array.isArray(point) ? point[0] : point === null || point === void 0 ? void 0 : point.sieve_label);
                const axisX = labels.map((label) => {
                    const sieve = interfaces_1.AllSieves.find((s) => s.label === label);
                    return sieve ? Number(sieve.value) : NaN;
                });
                if (axisX.length === 0 || axisX.some((value) => Number.isNaN(value))) {
                    throw new Error('Não foi possível montar o eixo de peneiras da composição: rótulo ausente em AllSieves ou percentsToList vazio.');
                }
                const pointsOfCurve = [];
                const sumOfPercents = [];
                let lowerComposition = { sumOfPercents: [], percentsOfMaterials: null };
                let averageComposition = { sumOfPercents: [], percentsOfMaterials: null };
                let higherComposition = { sumOfPercents: [], percentsOfMaterials: null };
                const granulometryComposition = {
                    lower: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('lower') ? percentsOfDosage[0] : [],
                            isEmpty: chosenCurves.includes('lower'),
                        },
                    },
                    average: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('average') ? percentsOfDosage[1] : [],
                            isEmpty: chosenCurves.includes('average'),
                        },
                    },
                    higher: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('higher') ? percentsOfDosage[2] : [],
                            isEmpty: chosenCurves.includes('higher'),
                        },
                    },
                };
                const bandsByLetter = {
                    A: {
                        higher: [100, 100, 89, 78, 71, 61, 55, 45, 36, 28, 24, 14, 7],
                        lower: [100, 90, 75, 58, 48, 35, 29, 19, 13, 9, 5, 2, 1],
                    },
                    B: {
                        higher: [null, 100, 100, 89, 82, 70, 63, 49, 37, 28, 20, 13, 8],
                        lower: [null, 100, 90, 70, 55, 42, 35, 23, 16, 10, 6, 4, 2],
                    },
                    C: {
                        higher: [null, null, null, 100, 100, 89, 83, 67, 52, 40, 29, 19, 10],
                        lower: [null, null, null, 100, 90, 65, 53, 32, 20, 13, 8, 4, 2],
                    },
                };
                const chosenBand = (_b = bandsByLetter[dnitBand]) !== null && _b !== void 0 ? _b : { higher: [], lower: [] };
                const band = {
                    higher: this.projectOntoAxis(chosenBand.higher, CANON_AXIS, axisX),
                    lower: this.projectOntoAxis(chosenBand.lower, CANON_AXIS, axisX),
                };
                const controlPoints = {
                    lower: this.projectOntoAxis((_d = (_c = nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.controlPoints) === null || _c === void 0 ? void 0 : _c.lower) !== null && _d !== void 0 ? _d : [], CANON_AXIS, axisX),
                    higher: this.projectOntoAxis((_f = (_e = nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.controlPoints) === null || _e === void 0 ? void 0 : _e.higher) !== null && _f !== void 0 ? _f : [], CANON_AXIS, axisX),
                };
                const restrictedZone = {
                    lower: this.projectOntoAxis((_h = (_g = nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.restrictedZone) === null || _g === void 0 ? void 0 : _g.lower) !== null && _h !== void 0 ? _h : [], CANON_AXIS, axisX),
                    higher: this.projectOntoAxis((_k = (_j = nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.restrictedZone) === null || _j === void 0 ? void 0 : _j.higher) !== null && _k !== void 0 ? _k : [], CANON_AXIS, axisX),
                };
                if (((_m = (_l = nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.controlPoints) === null || _l === void 0 ? void 0 : _l.lower) !== null && _m !== void 0 ? _m : []).length === 0) {
                    this.logger.warn(`nominalSize.controlPoints veio vazio para TNM ${nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.value}: o gráfico sai sem pontos de controle.`);
                }
                const nmas = Number(nominalSize === null || nominalSize === void 0 ? void 0 : nominalSize.value);
                const above = CANON_AXIS.filter((d) => d > nmas);
                const D = above.length > 0 ? Math.min(...above) : CANON_AXIS[0];
                const densityMaxCurve = axisX.map((d) => (d > D ? null : parseFloat((100 * Math.pow(d / D, 0.45)).toFixed(2))));
                const emptyCurve = new Array(axisX.length).fill(null);
                if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
                    lowerComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[0], percentsToList);
                    sumOfPercents[0] = this.insertBlankPointsOnCurve([...lowerComposition.sumOfPercents], axisX);
                }
                else {
                    sumOfPercents[0] = [...emptyCurve];
                }
                if (granulometryComposition.average.percentsOfDosage.isEmpty) {
                    averageComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[1], percentsToList);
                    sumOfPercents[1] = this.insertBlankPointsOnCurve([...averageComposition.sumOfPercents], axisX);
                }
                else {
                    sumOfPercents[1] = [...emptyCurve];
                }
                if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
                    higherComposition = this.calculatePercentOfMaterials(materials, percentsOfDosage[2], percentsToList);
                    sumOfPercents[2] = this.insertBlankPointsOnCurve([...higherComposition.sumOfPercents], axisX);
                }
                else {
                    sumOfPercents[2] = [...emptyCurve];
                }
                for (let i = 0; i < axisX.length; i++) {
                    pointsOfCurve.push([
                        parseFloat(Math.pow(axisX[i] / D, 0.45).toFixed(6)),
                        controlPoints.lower[i],
                        controlPoints.higher[i],
                        restrictedZone.lower[i],
                        restrictedZone.higher[i],
                        densityMaxCurve[i],
                        band.higher[i],
                        band.lower[i],
                        sumOfPercents[0][i],
                        sumOfPercents[1][i],
                        sumOfPercents[2][i],
                    ]);
                }
                const data = {
                    lowerComposition,
                    averageComposition,
                    higherComposition,
                    pointsOfCurve,
                    nominalSize,
                    chosenCurves,
                };
                return { data, success: true };
            }
            catch (error) {
                throw error;
            }
        });
    }
    projectOntoAxis(curve, fromAxis, toAxis) {
        if (!curve || curve.length === 0)
            return new Array(toAxis.length).fill(null);
        const filled = this.insertBlankPointsOnCurve([...curve], fromAxis);
        return toAxis.map((d) => {
            var _a;
            const exact = fromAxis.findIndex((x) => Math.abs(x - d) < 1e-9);
            if (exact >= 0)
                return (_a = filled[exact]) !== null && _a !== void 0 ? _a : null;
            for (let i = 0; i < fromAxis.length - 1; i++) {
                const x1 = fromAxis[i];
                const x2 = fromAxis[i + 1];
                if (d <= x1 && d >= x2) {
                    const y1 = filled[i];
                    const y2 = filled[i + 1];
                    if (y1 === null || y1 === undefined || y2 === null || y2 === undefined)
                        return null;
                    return y1 + ((d - x1) / (x2 - x1)) * (y2 - y1);
                }
            }
            return null;
        });
    }
    insertBlankPointsOnCurve(curve, axisX) {
        for (let k = 0; k < curve.length; k++) {
            if (curve[k] !== null) {
                for (let i = k; i < curve.length; i++) {
                    if (curve[i] === null) {
                        for (let j = i; j < curve.length; j++) {
                            if (curve[j] !== null) {
                                curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return curve;
    }
    findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
        if (y1 !== y2)
            curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
        else
            curve[i] = y1;
        return curve;
    }
    fillMissingPassants(serie) {
        let last = 100;
        return serie.map((value) => {
            if (value === null || value === undefined)
                return last;
            last = Number(value);
            return last;
        });
    }
    calculatePercentOfMaterials(materials, percentsOfDosage, percentsToList) {
        var _a, _b, _c;
        const percentsOfMaterialsToShow = [];
        const materialsWithoutBinder = materials.filter((material) => material.type !== 'asphaltBinder' && material.type !== 'CAP' && material.type !== 'other');
        for (let i = 0; i < percentsToList.length; i++) {
            percentsOfMaterialsToShow.push([]);
        }
        percentsToList.forEach((arr, idx) => {
            arr.forEach((subArr, i) => {
                if (!percentsOfMaterialsToShow[idx][i]) {
                    percentsOfMaterialsToShow[idx][i] = [];
                }
                if (Array.isArray(subArr) && subArr.length > 1) {
                    percentsOfMaterialsToShow[idx][i] = subArr[1];
                }
                else {
                    percentsOfMaterialsToShow[idx][i] = subArr;
                }
            });
        });
        const newPercentsOfDosage = Object.keys(percentsOfDosage !== null && percentsOfDosage !== void 0 ? percentsOfDosage : {})
            .sort((a, b) => Number(a.split('_').pop()) - Number(b.split('_').pop()))
            .map((key) => Number(percentsOfDosage[key]) || 0);
        const sieveCount = (_b = (_a = percentsToList === null || percentsToList === void 0 ? void 0 : percentsToList[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const sumOfPercents = new Array(sieveCount).fill(0);
        const percentsOfMaterials = [];
        for (let i = 0; i < materialsWithoutBinder.length; i++) {
            percentsOfMaterials.push([]);
            const serie = this.fillMissingPassants((_c = percentsOfMaterialsToShow[i]) !== null && _c !== void 0 ? _c : []);
            for (let j = 0; j < serie.length; j++) {
                percentsOfMaterials[i][j] = (serie[j] * newPercentsOfDosage[i]) / 100;
                if (sumOfPercents[j] === undefined)
                    sumOfPercents[j] = 0;
                sumOfPercents[j] += percentsOfMaterials[i][j];
            }
        }
        return { sumOfPercents, percentsOfMaterials };
    }
    saveGranulometryCompositionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]', { body });
                const { name } = body.granulometryCompositionData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.granulometryCompositionData, { name: materialName } = _a, granulometryCompositionWithoutName = __rest(_a, ["name"]);
                const superpaveWithGranulometryComposition = Object.assign(Object.assign({}, superpaveExists._doc), { granulometryCompositionData: granulometryCompositionWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithGranulometryComposition);
                if (superpaveExists._doc.generalData.step < 4) {
                    yield this.superpaveRepository.saveStep(superpaveExists, 4);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep5Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave initial binder step on granulometry-composition.superpave.service.ts > [body]', {
                    body,
                });
                const { name } = body.initialBinderData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.initialBinderData, { name: materialName } = _a, initialBinderWithoutName = __rest(_a, ["name"]);
                const superpaveWithInitialBinder = Object.assign(Object.assign({}, superpaveExists._doc), { initialBinderData: initialBinderWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinder);
                if (superpaveExists._doc.generalData.step < 5) {
                    yield this.superpaveRepository.saveStep(superpaveExists, 5);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.GranulometryComposition_Superpave_Service = GranulometryComposition_Superpave_Service;
exports.GranulometryComposition_Superpave_Service = GranulometryComposition_Superpave_Service = GranulometryComposition_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_2.SuperpaveRepository,
        repository_1.AsphaltGranulometryRepository])
], GranulometryComposition_Superpave_Service);
//# sourceMappingURL=granulometry-composition.superpave.service.js.map