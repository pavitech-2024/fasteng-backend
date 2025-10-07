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
                    const granulometry = granulometrys.find(({ generalData }) => aggregate._id.toString() === generalData.material._id.toString());
                    const passants = Object.fromEntries(granulometry.results.passant);
                    granulometry_data.push({
                        _id: aggregate._id,
                        passants,
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
            var _a, _b, _c, _d, _e, _f, _g;
            try {
                console.log('=== DEBUG CALCULATE GRANULOMETRY ===');
                console.log('Body recebido:', JSON.stringify(body, null, 2));
                let { chosenCurves, percentageInputs: percentsOfDosage, percentsToList, dnitBand, materials, nominalSize, } = body;
                console.log('=== VALIDAÇÃO INICIAL DOS DADOS ===');
                console.log('chosenCurves:', chosenCurves);
                console.log('percentsOfDosage:', percentsOfDosage);
                console.log('percentsToList:', percentsToList);
                console.log('dnitBand:', dnitBand);
                console.log('materials:', materials);
                console.log('nominalSize:', nominalSize);
                if (!chosenCurves || !Array.isArray(chosenCurves)) {
                    console.log('❌ chosenCurves é inválido, usando array vazio');
                    chosenCurves = [];
                }
                if (!percentsOfDosage || !Array.isArray(percentsOfDosage)) {
                    console.log('❌ percentsOfDosage é inválido, usando array vazio');
                    percentsOfDosage = [[], [], []];
                }
                if (!percentsToList || percentsToList.length === 0) {
                    console.log('❌ percentsToList está vazio, buscando dados...');
                    percentsToList = yield this.getPercentsToListData(materials, dnitBand);
                    console.log('✅ percentsToList obtido:', percentsToList);
                }
                if (!materials || !Array.isArray(materials)) {
                    console.log('❌ materials é inválido, usando array vazio');
                    materials = [];
                }
                if (!nominalSize || nominalSize.value === null || nominalSize.value === undefined || !nominalSize.curve) {
                    console.log('❌ nominalSize incompleto, usando valores padrão...');
                    nominalSize = yield this.getDefaultNominalSize(dnitBand);
                    console.log('✅ nominalSize padrão obtido:', nominalSize);
                }
                if (!nominalSize.controlPoints) {
                    console.log('❌ nominalSize.controlPoints é undefined, criando padrão');
                    nominalSize.controlPoints = { lower: [], higher: [] };
                }
                if (!nominalSize.restrictedZone) {
                    console.log('❌ nominalSize.restrictedZone é undefined, criando padrão');
                    nominalSize.restrictedZone = { lower: [], higher: [] };
                }
                if (!nominalSize.curve || !Array.isArray(nominalSize.curve)) {
                    console.log('❌ nominalSize.curve é inválido, criando array vazio');
                    nominalSize.curve = [];
                }
                console.log('Tipo de percentsOfDosage[0]:', typeof percentsOfDosage[0]);
                let lowerPercentsArray = [];
                let averagePercentsArray = [];
                let higherPercentsArray = [];
                if (percentsOfDosage[0] && typeof percentsOfDosage[0] === 'object') {
                    lowerPercentsArray = Object.values(percentsOfDosage[0]).map(val => Number(val) || 0);
                    console.log('percentsOfDosage[0] convertido para array:', lowerPercentsArray);
                }
                else if (Array.isArray(percentsOfDosage[0])) {
                    lowerPercentsArray = percentsOfDosage[0];
                }
                if (percentsOfDosage[1] && typeof percentsOfDosage[1] === 'object') {
                    averagePercentsArray = Object.values(percentsOfDosage[1]).map(val => Number(val) || 0);
                    console.log('percentsOfDosage[1] convertido para array:', averagePercentsArray);
                }
                else if (Array.isArray(percentsOfDosage[1])) {
                    averagePercentsArray = percentsOfDosage[1];
                }
                if (percentsOfDosage[2] && typeof percentsOfDosage[2] === 'object') {
                    higherPercentsArray = Object.values(percentsOfDosage[2]).map(val => Number(val) || 0);
                    console.log('percentsOfDosage[2] convertido para array:', higherPercentsArray);
                }
                else if (Array.isArray(percentsOfDosage[2])) {
                    higherPercentsArray = percentsOfDosage[2];
                }
                let pointsOfCurve = [];
                let band = { higher: [], lower: [] };
                let sumOfPercents = [[], [], []];
                let lowerComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null,
                };
                let averageComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null,
                };
                let higherComposition = {
                    sumOfPercents: [],
                    percentsOfMaterials: null,
                };
                const granulometryComposition = {
                    lower: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('lower') ? lowerPercentsArray : [],
                            isEmpty: chosenCurves.includes('lower') && lowerPercentsArray.length > 0,
                        },
                    },
                    average: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('average') ? averagePercentsArray : [],
                            isEmpty: chosenCurves.includes('average') && averagePercentsArray.length > 0,
                        },
                    },
                    higher: {
                        percentsOfDosage: {
                            value: chosenCurves.includes('higher') ? higherPercentsArray : [],
                            isEmpty: chosenCurves.includes('higher') && higherPercentsArray.length > 0,
                        },
                    },
                };
                console.log('Granulometry Composition:', granulometryComposition);
                const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];
                const higherBandA = this.insertBlankPointsOnCurve([100, 100, 89, 78, 71, 61, 55, 45, 36, 28, 24, 14, 7], axisX);
                const lowerBandA = this.insertBlankPointsOnCurve([100, 90, 75, 58, 48, 35, 29, 19, 13, 9, 5, 2, 1], axisX);
                const higherBandB = this.insertBlankPointsOnCurve([null, 100, 100, 89, 82, 70, 63, 49, 37, 28, 20, 13, 8], axisX);
                const lowerBandB = this.insertBlankPointsOnCurve([null, 100, 90, 70, 55, 42, 35, 23, 16, 10, 6, 4, 2], axisX);
                const higherBandC = this.insertBlankPointsOnCurve([null, null, null, 100, 100, 89, 83, 67, 52, 40, 29, 19, 10], axisX);
                const lowerBandC = this.insertBlankPointsOnCurve([null, null, null, 100, 90, 65, 53, 32, 20, 13, 8, 4, 2], axisX);
                if (dnitBand === 'A') {
                    band = { higher: higherBandA, lower: lowerBandA };
                }
                else if (dnitBand === 'B') {
                    band = { higher: higherBandB, lower: lowerBandB };
                }
                else if (dnitBand === 'C') {
                    band = { higher: higherBandC, lower: lowerBandC };
                }
                else {
                    console.log('❌ dnitBand inválido:', dnitBand);
                    band = { higher: [], lower: [] };
                }
                if (granulometryComposition.lower.percentsOfDosage.isEmpty && lowerPercentsArray.length > 0) {
                    console.log('Calculando composição lower...');
                    lowerComposition = this.calculatePercentOfMaterials(materials, lowerPercentsArray, percentsToList);
                    sumOfPercents[0] = ((_a = lowerComposition.sumOfPercents) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
                    console.log('Composição lower calculada:', lowerComposition);
                }
                else {
                    console.log('❌ Não há percentuais válidos para composição lower');
                    sumOfPercents[0] = [];
                }
                if (granulometryComposition.average.percentsOfDosage.isEmpty && averagePercentsArray.length > 0) {
                    console.log('Calculando composição average...');
                    averageComposition = this.calculatePercentOfMaterials(materials, averagePercentsArray, percentsToList);
                    sumOfPercents[1] = ((_b = averageComposition.sumOfPercents) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
                    console.log('Composição average calculada:', averageComposition);
                }
                else {
                    console.log('❌ Não há percentuais válidos para composição average');
                    sumOfPercents[1] = [];
                }
                if (granulometryComposition.higher.percentsOfDosage.isEmpty && higherPercentsArray.length > 0) {
                    console.log('Calculando composição higher...');
                    higherComposition = this.calculatePercentOfMaterials(materials, higherPercentsArray, percentsToList);
                    sumOfPercents[2] = ((_c = higherComposition.sumOfPercents) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
                    console.log('Composição higher calculada:', higherComposition);
                }
                else {
                    console.log('❌ Não há percentuais válidos para composição higher');
                    sumOfPercents[2] = [];
                }
                console.log('Processando pontos da curva...');
                if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
                    sumOfPercents[0] = this.insertBlankPointsOnCurve(sumOfPercents[0], axisX);
                }
                else {
                    sumOfPercents[0] = Array(13).fill(null);
                }
                if (granulometryComposition.average.percentsOfDosage.isEmpty) {
                    sumOfPercents[1] = this.insertBlankPointsOnCurve(sumOfPercents[1], axisX);
                }
                else {
                    sumOfPercents[1] = Array(13).fill(null);
                }
                if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
                    sumOfPercents[2] = this.insertBlankPointsOnCurve(sumOfPercents[2], axisX);
                }
                else {
                    sumOfPercents[2] = Array(13).fill(null);
                }
                for (let i = 0; i < nominalSize.curve.length; i++) {
                    const point = [
                        axisX[i] && nominalSize.value ? Math.pow(axisX[i] / nominalSize.value, 0.45) : null,
                        ((_d = nominalSize.controlPoints.lower) === null || _d === void 0 ? void 0 : _d[i]) || null,
                        ((_e = nominalSize.controlPoints.higher) === null || _e === void 0 ? void 0 : _e[i]) || null,
                        ((_f = nominalSize.restrictedZone.lower) === null || _f === void 0 ? void 0 : _f[i]) || null,
                        ((_g = nominalSize.restrictedZone.higher) === null || _g === void 0 ? void 0 : _g[i]) || null,
                        nominalSize.curve[i] || null,
                        band.higher[i] || null,
                        band.lower[i] || null,
                    ];
                    if (granulometryComposition.lower.percentsOfDosage.isEmpty) {
                        point.push(sumOfPercents[0][i] || null);
                    }
                    if (granulometryComposition.average.percentsOfDosage.isEmpty) {
                        point.push(sumOfPercents[1][i] || null);
                    }
                    if (granulometryComposition.higher.percentsOfDosage.isEmpty) {
                        point.push(sumOfPercents[2][i] || null);
                    }
                    pointsOfCurve.push(point);
                }
                console.log('=== DADOS PROCESSADOS COM SUCESSO ===');
                console.log('Points of curve:', pointsOfCurve);
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
                console.error('❌ ERRO NO CALCULATE GRANULOMETRY:', error);
                throw error;
            }
        });
    }
    getPercentsToListData(materials, dnitBand) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('=== OBTENDO PERCENTS TO LIST ===');
                throw new Error('Dados de análise granulométrica não fornecidos. ' +
                    'O frontend deve enviar percentsToList com as curvas granulométricas reais dos materiais. ' +
                    'Sem esses dados, o cálculo não pode ser realizado.');
            }
            catch (error) {
                console.error('❌ Erro crítico - dados granulométricos não fornecidos:', error);
                throw error;
            }
        });
    }
    getDefaultNominalSize(dnitBand) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Obtendo nominalSize padrão para banda:', dnitBand);
            const defaultSizes = {
                'A': {
                    value: 38.1,
                    controlPoints: {
                        lower: [100, 90, null, null, null, null, null, 19, null, null, null, null, 1],
                        higher: [100, 100, 90, null, null, null, null, 45, null, null, null, null, 7],
                    },
                    restrictedZone: {
                        lower: [null, null, null, null, null, null, 39.5, 26.8, 18.1, 13.6, 11.4, null, null],
                        higher: [null, null, null, null, null, null, 39.5, 30.8, 24.1, 17.6, 13.7, null, null],
                    },
                    curve: [100, 100, null, null, null, null, null, null, null, null, null, null, null],
                },
                'B': {
                    value: 19.1,
                    controlPoints: {
                        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
                        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
                    },
                    restrictedZone: {
                        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
                        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
                    },
                    curve: [null, 100, 100, null, null, null, null, null, null, null, null, null, null],
                },
                'C': {
                    value: 12.7,
                    controlPoints: {
                        lower: [null, null, 100, 90, null, null, null, 28, null, null, null, null, 2],
                        higher: [null, null, null, 100, 90, null, null, 58, null, null, null, null, 10],
                    },
                    restrictedZone: {
                        lower: [null, null, null, null, null, null, null, 39.1, 25.6, 19.1, 15.5, null, null],
                        higher: [null, null, null, null, null, null, null, 39.1, 31.6, 23.1, 15.5, null, null],
                    },
                    curve: [null, null, 100, 100, null, null, null, null, null, null, null, null, null],
                }
            };
            return defaultSizes[dnitBand] || defaultSizes['B'];
        });
    }
    getCompleteNominalSizeData(dnitBand, materials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('=== OBTENDO NOMINAL SIZE COMPLETO ===');
                const nominalSizeData = {
                    value: 19.1,
                    controlPoints: {
                        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
                        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
                    },
                    restrictedZone: {
                        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
                        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
                    },
                    curve: [null, 100, 100, null, null, null, null, null, null, null, null, null, null],
                };
                if (dnitBand === 'B') {
                    nominalSizeData.value = 19.1;
                    nominalSizeData.controlPoints = {
                        lower: [null, 100, 90, null, null, null, null, 23, null, null, null, null, 2],
                        higher: [null, null, 100, 90, null, null, null, 49, null, null, null, null, 8],
                    };
                    nominalSizeData.restrictedZone = {
                        lower: [null, null, null, null, null, null, null, 34.6, 22.3, 16.7, 13.7, null, null],
                        higher: [null, null, null, null, null, null, null, 34.6, 28.3, 20.7, 13.7, null, null],
                    };
                    nominalSizeData.curve = [null, 100, 100, null, null, null, null, null, null, null, null, null, null];
                }
                return nominalSizeData;
            }
            catch (error) {
                console.error('❌ Erro ao obter nominalSize completo:', error);
                return null;
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
    calculatePercentOfMaterials(materials, percentsOfDosage, percentsToList) {
        var _a;
        console.log('=== DEBUG calculatePercentOfMaterials ===');
        console.log('materials:', materials);
        console.log('percentsOfDosage:', percentsOfDosage);
        console.log('percentsToList:', percentsToList);
        console.log('percentsToList length:', percentsToList === null || percentsToList === void 0 ? void 0 : percentsToList.length);
        if (!materials || !Array.isArray(materials)) {
            console.log('❌ materials é inválido, usando array vazio');
            materials = [];
        }
        if (!percentsOfDosage || !Array.isArray(percentsOfDosage)) {
            console.log('❌ percentsOfDosage é inválido, usando array vazio');
            percentsOfDosage = [];
        }
        if (!percentsToList || !Array.isArray(percentsToList)) {
            console.log('❌ percentsToList é inválido, usando array vazio');
            percentsToList = [];
        }
        if (percentsToList.length === 0) {
            console.log('⚠️ percentsToList está vazio, criando estrutura básica...');
            percentsToList = materials.map(() => Array(13).fill(null).map((_, index) => [`Peneira ${index + 1}`, 0]));
            console.log('✅ Estrutura básica criada:', percentsToList);
        }
        let percentsOfMaterialsToShow = [];
        let newPercentsOfDosage = [];
        let materialsWithoutBinder = materials.filter((material) => material && material.type !== 'asphaltBinder' && material.type !== 'CAP' && material.type !== 'other');
        console.log('materialsWithoutBinder:', materialsWithoutBinder);
        for (let i = 0; i < percentsToList.length; i++) {
            percentsOfMaterialsToShow.push([]);
        }
        console.log('Processando percentsToList...');
        percentsToList.forEach((arr, idx) => {
            if (!arr || !Array.isArray(arr)) {
                console.log(`❌ percentsToList[${idx}] é inválido, pulando`);
                return;
            }
            arr.forEach((subArr, i) => {
                if (!percentsOfMaterialsToShow[idx]) {
                    percentsOfMaterialsToShow[idx] = [];
                }
                if (Array.isArray(subArr) && subArr.length > 1) {
                    percentsOfMaterialsToShow[idx][i] = subArr[1];
                }
                else {
                    percentsOfMaterialsToShow[idx][i] = subArr;
                }
            });
        });
        console.log('percentsOfMaterialsToShow:', percentsOfMaterialsToShow);
        if (Array.isArray(percentsOfDosage)) {
            newPercentsOfDosage = [...percentsOfDosage];
        }
        else if (typeof percentsOfDosage === 'object') {
            newPercentsOfDosage = Object.values(percentsOfDosage).map(val => Number(val) || 0);
        }
        else {
            newPercentsOfDosage = [];
        }
        console.log('newPercentsOfDosage:', newPercentsOfDosage);
        const numPeneiras = ((_a = percentsOfMaterialsToShow[0]) === null || _a === void 0 ? void 0 : _a.length) || 13;
        let sumOfPercents = Array(numPeneiras).fill(0);
        console.log('Número de peneiras:', numPeneiras);
        console.log('sumOfPercents inicial:', sumOfPercents);
        let percentsOfMaterials = [];
        for (let i = 0; i < materialsWithoutBinder.length; i++) {
            if (!percentsOfMaterialsToShow[i] || !Array.isArray(percentsOfMaterialsToShow[i])) {
                console.log(`❌ percentsOfMaterialsToShow[${i}] é inválido, pulando material`);
                percentsOfMaterials.push(Array(numPeneiras).fill(0));
                continue;
            }
            const percentDosage = newPercentsOfDosage[i] || 0;
            percentsOfMaterials.push([]);
            for (let j = 0; j < numPeneiras; j++) {
                const materialValue = percentsOfMaterialsToShow[i][j];
                if (materialValue !== null && materialValue !== undefined && !isNaN(materialValue)) {
                    const calculatedValue = (materialValue * percentDosage) / 100;
                    percentsOfMaterials[i][j] = calculatedValue;
                    if (j < sumOfPercents.length) {
                        sumOfPercents[j] += calculatedValue;
                    }
                }
                else {
                    percentsOfMaterials[i][j] = 0;
                }
            }
        }
        console.log('✅ Cálculo concluído:');
        console.log('sumOfPercents:', sumOfPercents);
        console.log('percentsOfMaterials:', percentsOfMaterials);
        return {
            sumOfPercents,
            percentsOfMaterials
        };
    }
    saveGranulometryCompositionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.log('save superpave granulometry composition step on granulometry-composition.superpave.service.ts > [body]', { body });
                const { name } = body.granulometryCompositionData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _b = body.granulometryCompositionData, { name: materialName } = _b, granulometryCompositionWithoutName = __rest(_b, ["name"]);
                const granulometryCompositionWithTableData = Object.assign(Object.assign({}, granulometryCompositionWithoutName), { granulometrys: ((_a = granulometryCompositionWithoutName.granulometrys) === null || _a === void 0 ? void 0 : _a.map(gran => ({
                        material: gran.material,
                        data: gran.data,
                        result: gran.result
                    }))) || [] });
                const superpaveWithGranulometryComposition = Object.assign(Object.assign({}, superpaveExists._doc), { granulometryCompositionData: granulometryCompositionWithTableData });
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