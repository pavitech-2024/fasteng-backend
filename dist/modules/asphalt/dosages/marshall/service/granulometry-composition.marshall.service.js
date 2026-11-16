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
var GranulometryComposition_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryComposition_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../essays/granulometry/repository");
const interfaces_1 = require("../../../../../utils/interfaces");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const repository_2 = require("../repository");
let GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service_1 = class GranulometryComposition_Marshall_Service {
    constructor(marshallModel, granulometry_repository, marshallRepository) {
        this.marshallModel = marshallModel;
        this.granulometry_repository = granulometry_repository;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(GranulometryComposition_Marshall_Service_1.name);
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
                    const { passant } = granulometry.step2Data;
                    let passants = {};
                    passant.forEach((p) => {
                        passants[p.sieve_label] = p.passant;
                    });
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
                const { dnitBands, percentageInputs, tableRows } = body;
                let percentsOfDosage = [];
                const ids1 = new Set();
                Object.keys(percentageInputs[0]).forEach((key) => {
                    const id = key.split('_')[1];
                    ids1.add(id);
                    const value = percentageInputs[0][key];
                    const index = Array.from(ids1).indexOf(id);
                    percentsOfDosage[index] = { [id]: value };
                });
                const ids2 = new Set();
                let percentsOfMaterials = [];
                for (let i = 0; i < percentsOfDosage.length; i++) {
                    let obj = percentsOfDosage[i];
                    let key = Object.keys(obj)[0];
                    percentsOfMaterials.push(Array(20).fill({ [key]: null }));
                }
                let newTableRows = tableRows;
                tableRows.forEach((element) => {
                    Object.keys(element).forEach((key) => {
                        if (key === 'sieve_label') {
                            const sieveLabel = element[key];
                            Object.keys(element).forEach((key2) => {
                                const stringIdx = key2.lastIndexOf('_');
                                if (stringIdx !== -1) {
                                    const firstString = key2.substring(0, stringIdx);
                                    if (firstString === 'total_passant') {
                                        const id = key2.substring(stringIdx + 1);
                                        ids2.add(id);
                                        const value = element[key2];
                                        const internIndex = Array.from(ids2).indexOf(id);
                                        const sieveIndex = interfaces_1.AllSieves.findIndex((sieve) => sieve.label === sieveLabel);
                                        if (sieveIndex !== -1) {
                                            percentsOfMaterials[internIndex][sieveIndex] = { [id]: value };
                                        }
                                    }
                                }
                            });
                        }
                    });
                });
                const axisX = [
                    76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106,
                    0.075,
                ];
                let higherBandA = this.insertBlankPointsOnCurve([null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8], axisX);
                let lowerBandA = this.insertBlankPointsOnCurve([null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1], axisX);
                let higherBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8], axisX);
                let lowerBandB = this.insertBlankPointsOnCurve([null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3], axisX);
                let higherBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10], axisX);
                let lowerBandC = this.insertBlankPointsOnCurve([null, null, null, null, null, null, 100, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2], axisX);
                let band = { higher: [], lower: [] };
                if (dnitBands === 'A')
                    band = { higher: higherBandA, lower: lowerBandA };
                else if (dnitBands === 'B')
                    band = { higher: higherBandB, lower: lowerBandB };
                else if (dnitBands === 'C')
                    band = { higher: higherBandC, lower: lowerBandC };
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
                    null,
                    null,
                    null,
                    null,
                ];
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < 20; j++) {
                        let materialValue = Object.values(percentsOfMaterials[i][j])[0];
                        let materialKey = Object.keys(percentsOfMaterials[i][j])[0];
                        if (materialValue !== null) {
                            let dosageObject = percentsOfDosage.find((e) => e.hasOwnProperty(materialKey));
                            let dosageValue = null;
                            if (dosageObject) {
                                dosageValue = dosageObject[materialKey];
                            }
                            if (materialValue !== null) {
                                let value = (materialValue * dosageValue) / 100;
                                percentsOfMaterials[i][j] = { [materialKey]: value };
                                sumOfPercents[j] += percentsOfMaterials[i][j][materialKey];
                            }
                        }
                        else
                            percentsOfMaterials[i][j] = null;
                    }
                }
                tableRows.forEach((element) => {
                    Object.keys(element).forEach((keys) => {
                        const stringIndex = keys.indexOf('_');
                        const label = keys.substring(0, stringIndex);
                        const id = keys.substring(stringIndex + 1);
                        const newArray = percentsOfMaterials.map((innerArray) => innerArray.filter((value) => value !== null));
                        const index = tableRows.indexOf(element);
                        if (label === 'passant') {
                            const key = Object.keys(tableRows[index]).find((k) => k === `passant_${id}`);
                            if (key) {
                                let newArrIndex = newArray.findIndex((e) => e[0] && e[0].hasOwnProperty(id));
                                if (newArrIndex !== -1 && newArray[newArrIndex][index] && newArray[newArrIndex][index][id]) {
                                    newTableRows[index][key] = newArray[newArrIndex][index][id];
                                }
                                else {
                                    if (!newTableRows[index])
                                        newTableRows[index] = {};
                                    newTableRows[index][`total_passant_${id}`] = '---';
                                    console.log(`The id "${id}" was not found in the index ${index} of the newArray.`);
                                }
                            }
                            else {
                                if (!newTableRows[index])
                                    newTableRows[index] = {};
                                newTableRows[index][`total_passant_${id}`] = '---';
                                console.log(`The key "passant_${id}" was not found in the object at index ${index}.`);
                            }
                        }
                    });
                });
                const projections = [];
                sumOfPercents.map((e, idx) => {
                    if (e !== null) {
                        const index = idx;
                        const sieve = interfaces_1.AllSieves[index];
                        projections.push({ label: sieve.label, value: e.toFixed(2) });
                    }
                });
                sumOfPercents = this.insertBlankPointsOnCurve(sumOfPercents, axisX);
                const higherTolerance = [];
                const lowerTolerance = [];
                for (let i = 0; i < sumOfPercents.length; i++) {
                    if (sumOfPercents[i] === null) {
                        higherTolerance.push(null);
                        lowerTolerance.push(null);
                    }
                    else {
                        let upperLimit = band.higher[i];
                        let lowerLimit = band.lower[i];
                        if (i < 9) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 7);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 7);
                        }
                        else if (i > 8 && i < 16) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 5);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 5);
                        }
                        else if (i > 15 && i < 19) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 3);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 3);
                        }
                        else if (i === 19) {
                            upperLimit = Math.min(band.higher[i], sumOfPercents[i] + 2);
                            lowerLimit = Math.max(band.lower[i], sumOfPercents[i] - 2);
                        }
                        higherTolerance.push(upperLimit);
                        lowerTolerance.push(lowerLimit);
                    }
                }
                const pointsOfCurve = [];
                for (let i = 0; i < sumOfPercents.length; i++) {
                    pointsOfCurve.push([
                        axisX[i],
                        band.higher[i],
                        higherTolerance[i],
                        sumOfPercents[i],
                        lowerTolerance[i],
                        band.lower[i],
                    ]);
                }
                newTableRows.map((row) => {
                    Object.values(row).some((value) => {
                        if (value === null) {
                            Object.keys(row).forEach((key) => {
                                if (row[key] === null) {
                                    row[key] = '---';
                                }
                            });
                        }
                    });
                });
                const ensureCorrectBandValues = (band, dnitBands) => {
                    if (dnitBands === 'C') {
                        console.log('=== APLICANDO CORREÇÃO PARA BANDA C ===');
                        const correctValues = {
                            lower: {
                                6: 100,
                                8: 70,
                                10: 44,
                                12: 22,
                                14: 14,
                                15: 8,
                                17: 4,
                                19: 2
                            },
                            higher: {
                                6: 100,
                                8: 90,
                                10: 72,
                                12: 50,
                                14: 36.29,
                                15: 26,
                                17: 16,
                                19: 10
                            }
                        };
                        Object.keys(correctValues.lower).forEach(idxStr => {
                            const idx = parseInt(idxStr);
                            if (idx < band.lower.length) {
                                console.log(`Corrigindo band.lower[${idx}] de ${band.lower[idx]} para ${correctValues.lower[idx]}`);
                                band.lower[idx] = correctValues.lower[idx];
                            }
                        });
                        Object.keys(correctValues.higher).forEach(idxStr => {
                            const idx = parseInt(idxStr);
                            if (idx < band.higher.length) {
                                console.log(`Corrigindo band.higher[${idx}] de ${band.higher[idx]} para ${correctValues.higher[idx]}`);
                                band.higher[idx] = correctValues.higher[idx];
                            }
                        });
                    }
                    return band;
                };
                band = ensureCorrectBandValues(band, dnitBands);
                const filteredBand = {
                    lowerBand: [],
                    higherBand: []
                };
                const indexCorrection = {
                    6: 6,
                    14: 15,
                    16: 17,
                    18: 19
                };
                projections.forEach((proj) => {
                    const sieveLabel = proj.label;
                    const sieveIndex = interfaces_1.AllSieves.findIndex(sieve => sieve.label === sieveLabel);
                    let bandIndex = sieveIndex;
                    if (indexCorrection[sieveIndex] !== undefined) {
                        bandIndex = indexCorrection[sieveIndex];
                    }
                    let lowerValue = null;
                    let higherValue = null;
                    if (bandIndex !== -1) {
                        if (bandIndex < band.lower.length)
                            lowerValue = band.lower[bandIndex];
                        if (bandIndex < band.higher.length)
                            higherValue = band.higher[bandIndex];
                    }
                    filteredBand.lowerBand.push(lowerValue);
                    filteredBand.higherBand.push(higherValue);
                });
                const tableWithBands = projections.map((proj, idx) => {
                    return {
                        sieve_label: proj.label,
                        projection: proj.value,
                        inferior: filteredBand.lowerBand[idx] !== null
                            ? filteredBand.lowerBand[idx].toFixed(2)
                            : '---',
                        superior: filteredBand.higherBand[idx] !== null
                            ? filteredBand.higherBand[idx].toFixed(2)
                            : '---'
                    };
                });
                console.log('=== VALORES CORRETOS FINAIS ===');
                console.log('Peneira               | Projeção | Inferior | Superior');
                console.log('----------------------|----------|----------|----------');
                tableWithBands.forEach(row => {
                    console.log(`${row.sieve_label.padEnd(20)} | ${row.projection.padEnd(8)} | ${row.inferior.padEnd(8)} | ${row.superior}`);
                });
                const data = {
                    percentsOfMaterials,
                    sumOfPercents,
                    pointsOfCurve,
                    table_data: newTableRows,
                    projections,
                    bands: filteredBand,
                    dnitBands: band,
                    tableWithBands: tableWithBands
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall granulometry composition step on granulometry-composition.marshall.service.ts > [body]', { body });
                const { name } = body.granulometryCompositionData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.granulometryCompositionData, { name: materialName } = _a, granulometryCompositionWithoutName = __rest(_a, ["name"]);
                const marshallWithGranulometryComposition = Object.assign(Object.assign({}, marshallExists._doc), { granulometryCompositionData: granulometryCompositionWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithGranulometryComposition);
                if (marshallExists._doc.generalData.step < 3) {
                    yield this.marshallRepository.saveStep(marshallExists, 3);
                }
                return true;
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
        if (y1 !== y2) {
            let a = (y2 - y1) / (x2 - x1);
            let b = (y1 * x2 - y2 * x1) / (x2 - x1);
            curve[i] = a * axisX[i] + b;
        }
        else
            curve[i] = y1;
        return curve;
    }
};
exports.GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service;
exports.GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service = GranulometryComposition_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.AsphaltGranulometryRepository,
        repository_2.MarshallRepository])
], GranulometryComposition_Marshall_Service);
//# sourceMappingURL=granulometry-composition.marshall.service.js.map