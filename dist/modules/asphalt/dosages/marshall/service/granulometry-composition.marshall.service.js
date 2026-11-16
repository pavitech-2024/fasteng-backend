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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const repository_1 = require("../../../essays/granulometry/repository");
const interfaces_1 = require("../../../../../utils/interfaces");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
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
            const granulometrys = yield this.granulometry_repository.findAll();
            const granulometryData = aggregates.map((aggregate) => {
                var _a, _b;
                const granulometry = granulometrys.find(({ generalData }) => aggregate._id.toString() === generalData.material._id.toString());
                const passants = {};
                (_b = (_a = granulometry === null || granulometry === void 0 ? void 0 : granulometry.step2Data) === null || _a === void 0 ? void 0 : _a.table_data) === null || _b === void 0 ? void 0 : _b.forEach((item) => {
                    passants[item.sieve_label] = item.passant;
                });
                return {
                    _id: aggregate._id,
                    passants,
                };
            });
            const tableColumnHeaders = ['sieve_label'];
            const tableRows = [];
            interfaces_1.AllSieves.forEach((sieve) => {
                const containsSieve = granulometryData.some((aggregate) => sieve.label in aggregate.passants);
                if (!containsSieve)
                    return;
                const aggregatesData = {};
                granulometryData.forEach(({ _id, passants }) => {
                    const totalPassantKey = `total_passant_${_id}`;
                    const passantKey = `passant_${_id}`;
                    aggregatesData[totalPassantKey] = passants[sieve.label];
                    aggregatesData[passantKey] = null;
                    if (!tableColumnHeaders.includes(totalPassantKey)) {
                        tableColumnHeaders.push(totalPassantKey, passantKey);
                    }
                });
                tableRows.push(Object.assign({ sieve_label: sieve.label }, aggregatesData));
            });
            this.logger.log(tableRows);
            this.logger.log(tableColumnHeaders);
            return {
                table_column_headers: tableColumnHeaders,
                table_rows: tableRows,
            };
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { dnitBands, percentageInputs, tableRows } = body;
            const percentsOfDosage = [];
            const materialIds = [];
            Object.keys(percentageInputs[0]).forEach((key) => {
                const id = key.split('_')[1];
                if (!materialIds.includes(id)) {
                    materialIds.push(id);
                    percentsOfDosage.push({ [id]: percentageInputs[0][key] });
                }
            });
            const percentsOfMaterials = percentsOfDosage.map((dosage) => {
                const materialId = Object.keys(dosage)[0];
                return Array(20).fill({ [materialId]: null });
            });
            const materialIndexes = new Map();
            percentsOfDosage.forEach((dosage, index) => {
                materialIndexes.set(Object.keys(dosage)[0], index);
            });
            tableRows.forEach((row) => {
                const sieveIndex = interfaces_1.AllSieves.findIndex((sieve) => sieve.label === row.sieve_label);
                if (sieveIndex === -1)
                    return;
                Object.keys(row).forEach((key) => {
                    const lastIndex = key.lastIndexOf('_');
                    if (lastIndex === -1)
                        return;
                    const property = key.substring(0, lastIndex);
                    if (property !== 'total_passant')
                        return;
                    const id = key.substring(lastIndex + 1);
                    const materialIndex = materialIndexes.get(id);
                    if (materialIndex === undefined)
                        return;
                    percentsOfMaterials[materialIndex][sieveIndex] = {
                        [id]: row[key],
                    };
                });
            });
            const axisX = [
                76, 64, 50, 38, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4,
                2, 1.2, 0.85, 0.6, 0.43, 0.3, 0.25, 0.18, 0.15, 0.106,
                0.075,
            ];
            const bands = {
                A: {
                    higher: [
                        null, null, 100, 100, null, 100, 90, null, 65, null,
                        50, null, 40, null, null, 30, null, 20, null, 8,
                    ],
                    lower: [
                        null, null, 100, 95, null, 75, 60, null, 35, null,
                        25, null, 20, null, null, 10, null, 5, null, 1,
                    ],
                },
                B: {
                    higher: [
                        null, null, null, 100, null, 100, 100, null, 80, null,
                        60, null, 45, null, null, 32, null, 20, null, 8,
                    ],
                    lower: [
                        null, null, null, 100, null, 95, 80, null, 45, null,
                        28, null, 20, null, null, 10, null, 8, null, 3,
                    ],
                },
                C: {
                    higher: [
                        null, null, null, null, null, null, 100, 100, 90, null,
                        72, null, 50, null, null, 26, null, 16, null, 10,
                    ],
                    lower: [
                        null, null, null, null, null, null, 100, 80, 70, null,
                        44, null, 22, null, null, 8, null, 4, null, 2,
                    ],
                },
            };
            let band = {
                higher: [],
                lower: [],
            };
            if (bands[dnitBands]) {
                band = {
                    higher: this.insertBlankPointsOnCurve([...bands[dnitBands].higher], axisX),
                    lower: this.insertBlankPointsOnCurve([...bands[dnitBands].lower], axisX),
                };
            }
            let sumOfPercents = Array(24).fill(null);
            percentsOfMaterials.forEach((material) => {
                material.forEach((materialData, sieveIndex) => {
                    var _a;
                    if (materialData === null)
                        return;
                    const materialId = Object.keys(materialData)[0];
                    const materialValue = Object.values(materialData)[0];
                    if (materialValue === null)
                        return;
                    const dosage = percentsOfDosage.find((item) => Object.prototype.hasOwnProperty.call(item, materialId));
                    const dosageValue = dosage ? dosage[materialId] : null;
                    const value = (materialValue * dosageValue) / 100;
                    material[sieveIndex] = {
                        [materialId]: value,
                    };
                    sumOfPercents[sieveIndex] =
                        ((_a = sumOfPercents[sieveIndex]) !== null && _a !== void 0 ? _a : 0) + value;
                });
            });
            const newTableRows = tableRows.map((row, rowIndex) => {
                const updatedRow = Object.assign({}, row);
                Object.keys(row).forEach((key) => {
                    const lastIndex = key.lastIndexOf('_');
                    if (lastIndex === -1)
                        return;
                    const property = key.substring(0, lastIndex);
                    if (property !== 'passant')
                        return;
                    const id = key.substring(lastIndex + 1);
                    const materialIndex = materialIndexes.get(id);
                    const sieveIndex = interfaces_1.AllSieves.findIndex((sieve) => sieve.label === row.sieve_label);
                    const materialData = materialIndex !== undefined && sieveIndex !== -1
                        ? percentsOfMaterials[materialIndex][sieveIndex]
                        : null;
                    const calculatedValue = materialData && materialData[id] !== undefined
                        ? materialData[id]
                        : null;
                    if (calculatedValue !== null) {
                        updatedRow[key] = calculatedValue;
                    }
                    else {
                        updatedRow[`total_passant_${id}`] = '---';
                        this.logger.warn(`Material "${id}" não encontrado na linha ${rowIndex}.`);
                    }
                });
                return updatedRow;
            });
            const projections = sumOfPercents.reduce((result, value, index) => {
                if (value !== null && interfaces_1.AllSieves[index]) {
                    result.push({
                        label: interfaces_1.AllSieves[index].label,
                        value: value.toFixed(2),
                    });
                }
                return result;
            }, []);
            sumOfPercents = this.insertBlankPointsOnCurve(sumOfPercents, axisX);
            const higherTolerance = [];
            const lowerTolerance = [];
            sumOfPercents.forEach((value, index) => {
                if (value === null) {
                    higherTolerance.push(null);
                    lowerTolerance.push(null);
                    return;
                }
                let tolerance = 0;
                if (index < 9) {
                    tolerance = 7;
                }
                else if (index < 16) {
                    tolerance = 5;
                }
                else if (index < 19) {
                    tolerance = 3;
                }
                else if (index === 19) {
                    tolerance = 2;
                }
                const upperLimit = Math.min(band.higher[index], value + tolerance);
                const lowerLimit = Math.max(band.lower[index], value - tolerance);
                higherTolerance.push(upperLimit);
                lowerTolerance.push(lowerLimit);
            });
            const pointsOfCurve = sumOfPercents.map((value, index) => [
                axisX[index],
                band.higher[index],
                higherTolerance[index],
                value,
                lowerTolerance[index],
                band.lower[index],
            ]);
            newTableRows.forEach((row) => {
                Object.keys(row).forEach((key) => {
                    if (row[key] === null) {
                        row[key] = '---';
                    }
                });
            });
            const correctBandCValues = {
                lower: {
                    6: 100,
                    8: 70,
                    10: 44,
                    12: 22,
                    14: 14,
                    15: 8,
                    17: 4,
                    19: 2,
                },
                higher: {
                    6: 100,
                    8: 90,
                    10: 72,
                    12: 50,
                    14: 36.29,
                    15: 26,
                    17: 16,
                    19: 10,
                },
            };
            if (dnitBands === 'C') {
                Object.entries(correctBandCValues.lower).forEach(([index, value]) => {
                    band.lower[Number(index)] = value;
                });
                Object.entries(correctBandCValues.higher).forEach(([index, value]) => {
                    band.higher[Number(index)] = value;
                });
            }
            const indexCorrection = {
                6: 6,
                14: 15,
                16: 17,
                18: 19,
            };
            const filteredBand = {
                lowerBand: [],
                higherBand: [],
            };
            projections.forEach((projection) => {
                var _a, _b;
                const sieveIndex = interfaces_1.AllSieves.findIndex((sieve) => sieve.label === projection.label);
                const bandIndex = indexCorrection[sieveIndex] !== undefined
                    ? indexCorrection[sieveIndex]
                    : sieveIndex;
                filteredBand.lowerBand.push(bandIndex !== -1 ? (_a = band.lower[bandIndex]) !== null && _a !== void 0 ? _a : null : null);
                filteredBand.higherBand.push(bandIndex !== -1 ? (_b = band.higher[bandIndex]) !== null && _b !== void 0 ? _b : null : null);
            });
            const tableWithBands = projections.map((projection, index) => ({
                sieve_label: projection.label,
                projection: projection.value,
                inferior: filteredBand.lowerBand[index] !== null
                    ? filteredBand.lowerBand[index].toFixed(2)
                    : '---',
                superior: filteredBand.higherBand[index] !== null
                    ? filteredBand.higherBand[index].toFixed(2)
                    : '---',
            }));
            this.logger.log('Valores finais das projeções e bandas:');
            this.logger.log(tableWithBands);
            return {
                percentsOfMaterials,
                sumOfPercents,
                pointsOfCurve,
                table_data: newTableRows,
                projections,
                bands: filteredBand,
                dnitBands: band,
                tableWithBands,
            };
        });
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save marshall granulometry composition step on granulometry-composition.marshall.service.ts > [body]', { body });
            const _a = body.granulometryCompositionData, { name } = _a, granulometryCompositionWithoutName = __rest(_a, ["name"]);
            const marshallExists = yield this.marshallRepository.findOne(name, userId);
            yield this.marshallModel.updateOne({ _id: marshallExists._id }, {
                $set: {
                    granulometryCompositionData: granulometryCompositionWithoutName,
                },
            });
            if (marshallExists.step < 3) {
                yield this.marshallRepository.saveStep(marshallExists, 3);
            }
            return true;
        });
    }
    insertBlankPointsOnCurve(curve, axisX) {
        for (let k = 0; k < curve.length; k++) {
            if (curve[k] === null)
                continue;
            for (let i = k; i < curve.length; i++) {
                if (curve[i] !== null)
                    continue;
                for (let j = i; j < curve.length; j++) {
                    if (curve[j] === null)
                        continue;
                    curve = this.findEquationOfCurve(curve, axisX, curve[i - 1], curve[j], axisX[i - 1], axisX[j], i);
                    break;
                }
            }
        }
        return curve;
    }
    findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
        if (y1 === y2) {
            curve[i] = y1;
            return curve;
        }
        const a = (y2 - y1) / (x2 - x1);
        const b = (y1 * x2 - y2 * x1) / (x2 - x1);
        curve[i] = a * axisX[i] + b;
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