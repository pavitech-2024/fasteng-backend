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
                    const granulometry = granulometrys.find(({ generalData }) => {
                        const { material } = generalData;
                        return aggregate._id.toString() === material._id.toString();
                    });
                    const { passant } = granulometry.results;
                    let passants = {};
                    passant.forEach((p) => {
                        passants[p[0]] = p[1];
                    });
                    console.log(passants);
                    granulometry_data.push({
                        _id: aggregate._id,
                        passants: passants,
                    });
                });
                const table_column_headers = [];
                const table_rows = [];
                table_column_headers.push('sieve_label');
                interfaces_1.AllSieves.forEach((sieve) => {
                    const contains = granulometry_data.some((aggregate) => sieve.label in aggregate.passants);
                    if (contains) {
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
                    }
                });
                this.logger.log(table_rows);
                this.logger.log(table_column_headers);
                const table_data = {
                    table_column_headers,
                    table_rows,
                };
                return table_data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chosenCurves, percentageInputs: percentsOfDosage, percentsToList, dnitBand, materials, nominalSize } = body;
                let pointsOfCurve = [];
                let band = { higher: [Number], lower: [Number] };
                let sumOfPercents = [];
                let lowerComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null
                };
                let averageComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null
                };
                let higherComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null
                };
                let granulometryComposition = {
                    lower: {
                        percentsOfDosage: {
                            value: [],
                            isEmpty: true,
                        },
                    },
                    average: {
                        percentsOfDosage: {
                            value: [],
                            isEmpty: true,
                        },
                    },
                    higher: {
                        percentsOfDosage: {
                            value: [],
                            isEmpty: true,
                        },
                    },
                };
                if (chosenCurves.lower && percentsOfDosage[0].length !== 0) {
                    granulometryComposition.lower.percentsOfDosage.value = percentsOfDosage[0];
                    granulometryComposition.lower.percentsOfDosage.isEmpty = false;
                }
                else {
                    granulometryComposition.lower.percentsOfDosage.isEmpty = true;
                }
                if (chosenCurves.average && percentsOfDosage[0].length !== 0) {
                    granulometryComposition.average.percentsOfDosage.value = percentsOfDosage[0];
                    granulometryComposition.average.percentsOfDosage.isEmpty = false;
                }
                else {
                    granulometryComposition.average.percentsOfDosage.isEmpty = true;
                }
                if (chosenCurves.higher && percentsOfDosage[0].length !== 0) {
                    granulometryComposition.higher.percentsOfDosage.value = percentsOfDosage[0];
                    granulometryComposition.higher.percentsOfDosage.isEmpty = false;
                }
                else {
                    granulometryComposition.higher.percentsOfDosage.isEmpty = true;
                }
                const axisX = [
                    75, 64, 50, 37.5, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.6, 0.43, 0.3, 0.18, 0.15, 0.075, 0,
                ];
                const higherBandA = this.insertBlankPointsOnCurve([null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8], axisX);
                const lowerBandA = this.insertBlankPointsOnCurve([null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1], axisX);
                const higherBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8], axisX);
                const lowerBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3], axisX);
                const higherBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10], axisX);
                const lowerBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2], axisX);
                if (dnitBand === 'A') {
                    band = { higher: higherBandA, lower: lowerBandA };
                }
                else if (dnitBand === 'B') {
                    band = { higher: higherBandB, lower: lowerBandB };
                }
                else if (dnitBand === 'C') {
                    band = { higher: higherBandC, lower: lowerBandC };
                }
                if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
                    lowerComposition = this.calculatePercentOfMaterials(0, materials, percentsOfDosage[0], percentsToList);
                    sumOfPercents[0] = lowerComposition.sumOfPercents.map((e) => e);
                }
                if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
                    averageComposition = this.calculatePercentOfMaterials(1, materials, percentsOfDosage[1], percentsToList);
                    sumOfPercents[1] = averageComposition.sumOfPercents.map((e) => e);
                }
                if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
                    higherComposition = this.calculatePercentOfMaterials(2, materials, percentsOfDosage[2], percentsToList);
                    sumOfPercents[2] = higherComposition.sumOfPercents.map((e) => e);
                }
                if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
                    sumOfPercents[0] = this.insertBlankPointsOnCurve(sumOfPercents[0], axisX);
                }
                else {
                    sumOfPercents[0] = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                    ];
                }
                if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
                    sumOfPercents[1] = this.insertBlankPointsOnCurve(sumOfPercents[1], axisX);
                }
                else {
                    sumOfPercents[1] = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                    ];
                }
                if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
                    sumOfPercents[2] = this.insertBlankPointsOnCurve(sumOfPercents[2], axisX);
                }
                else {
                    sumOfPercents[2] = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                    ];
                }
                for (let i = 0; i < 20 + 1; i++) {
                    pointsOfCurve.push([
                        Math.pow(axisX[i] / nominalSize.value, 0.45),
                        nominalSize.controlPoints.lower[i],
                        nominalSize.controlPoints.higher[i],
                        nominalSize.restrictedZone.lower[i],
                        nominalSize.restrictedZone.higher[i],
                        nominalSize.curve[i],
                        band.higher[i],
                        band.lower[i],
                    ]);
                }
                if (!granulometryComposition.lower.percentsOfDosage.isEmpty) {
                    for (let i = 0; i < 20 + 1; i++) {
                        pointsOfCurve[i].push(sumOfPercents[0][i]);
                    }
                }
                if (!granulometryComposition.average.percentsOfDosage.isEmpty) {
                    for (let i = 0; i < 20 + 1; i++) {
                        pointsOfCurve[i].push(sumOfPercents[1][i]);
                    }
                }
                if (!granulometryComposition.higher.percentsOfDosage.isEmpty) {
                    for (let i = 0; i < 20 + 1; i++) {
                        pointsOfCurve[i].push(sumOfPercents[2][i]);
                    }
                }
                pointsOfCurve = pointsOfCurve;
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
    calculatePercentOfMaterials(band, materials, percentsOfDosage, percentsToList) {
        let percentsOfMaterialsToShow = [];
        let newPercentsOfDosage = [];
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
        Object.values(percentsOfDosage).forEach((value) => {
            newPercentsOfDosage.push(value);
        });
        let sumOfPercents = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ];
        let percentsOfMaterials = [];
        for (let i = 0; i < materials.length; i++) {
            percentsOfMaterials.push([]);
            for (let j = 0; j < percentsOfMaterialsToShow[i].length; j++) {
                if (percentsOfMaterialsToShow[i][j] !== null) {
                    percentsOfMaterials[i][j] = (percentsOfMaterialsToShow[i][j] * newPercentsOfDosage[i]) / 100;
                    sumOfPercents[j] += percentsOfMaterials[i][j];
                }
                else {
                    percentsOfMaterials[i][j] = null;
                }
            }
        }
        return { sumOfPercents, percentsOfMaterials };
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]', { body });
                const { name } = body.granulometryCompositionData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.granulometryCompositionData, { name: materialName } = _a, granulometryCompositionWithoutName = __rest(_a, ["name"]);
                const superpaveWithGranulometryComposition = Object.assign(Object.assign({}, superpaveExists._doc), { granulometryCompositionData: granulometryCompositionWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithGranulometryComposition);
                if (superpaveExists._doc.generalData.step < 3) {
                    yield this.superpaveRepository.saveStep(superpaveExists, 3);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep4Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave initial binder step on granulometry-composition.superpave.service.ts > [body]', { body });
                const { name } = body.initialBinderData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.initialBinderData, { name: materialName } = _a, initialBinderWithoutName = __rest(_a, ["name"]);
                const superpaveWithInitialBinder = Object.assign(Object.assign({}, superpaveExists._doc), { initialBinderData: initialBinderWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinder);
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