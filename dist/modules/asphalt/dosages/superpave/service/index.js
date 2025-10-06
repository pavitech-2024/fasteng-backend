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
var SuperpaveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperpaveService = void 0;
const common_1 = require("@nestjs/common");
const general_data_superpave_service_1 = require("./general-data.superpave.service");
const material_selection_superpave_service_1 = require("./material-selection.superpave.service");
const index_1 = require("../repository/index");
const granulometry_composition_superpave_service_1 = require("./granulometry-composition.superpave.service");
const repository_1 = require("../../../essays/granulometry/repository");
const initial_binder_superpave_service_1 = require("./initial-binder.superpave.service");
const first_compression_service_1 = require("./first-compression.service");
const first_curve_percentages_service_1 = require("./first-curve-percentages.service");
const chosen_curves_percentages_service_1 = require("./chosen-curves-percentages.service");
const second_compression_superpave_service_1 = require("./second-compression.superpave.service");
const second_compression_parameters_service_1 = require("./second-compression-parameters.service");
const resume_dosage_service_1 = require("./resume-dosage.service");
const granulometry_essay_service_1 = require("./granulometry-essay.service");
const service_1 = require("../../../essays/granulometry/service");
const viscosityRotational_service_1 = require("../../../essays/viscosityRotational/service/viscosityRotational.service");
const interfaces_1 = require("../../../../../utils/interfaces");
const confirm_compaction_service_1 = require("./confirm-compaction.service");
let SuperpaveService = SuperpaveService_1 = class SuperpaveService {
    constructor(superpave_repository, generalData_Service, granulometryEssay_Service, materialSelection_Service, granulometryComposition_Service, granulometryRepository, initialBinder_Service, firstCompression_Service, firstCompressionParams_Service, chosenCurvePercentages_Service, secondCompression_Service, secondCompressionParameters_Service, confirmCompaction_Service, resumeDosageEquation_Service, asphaltGranulometry_Service, rotationalViscosity_Service) {
        this.superpave_repository = superpave_repository;
        this.generalData_Service = generalData_Service;
        this.granulometryEssay_Service = granulometryEssay_Service;
        this.materialSelection_Service = materialSelection_Service;
        this.granulometryComposition_Service = granulometryComposition_Service;
        this.granulometryRepository = granulometryRepository;
        this.initialBinder_Service = initialBinder_Service;
        this.firstCompression_Service = firstCompression_Service;
        this.firstCompressionParams_Service = firstCompressionParams_Service;
        this.chosenCurvePercentages_Service = chosenCurvePercentages_Service;
        this.secondCompression_Service = secondCompression_Service;
        this.secondCompressionParameters_Service = secondCompressionParameters_Service;
        this.confirmCompaction_Service = confirmCompaction_Service;
        this.resumeDosageEquation_Service = resumeDosageEquation_Service;
        this.asphaltGranulometry_Service = asphaltGranulometry_Service;
        this.rotationalViscosity_Service = rotationalViscosity_Service;
        this.logger = new common_1.Logger(SuperpaveService_1.name);
    }
    verifyInitSuperpave(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.generalData_Service.verifyInitSuperpave(body, userId);
                return dosage;
            }
            catch (error) {
                this.logger.error(`error on verify init > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getAllDosages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosages = yield this.superpave_repository.find();
                const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);
                return userDosages;
            }
            catch (error) {
                this.logger.error(`error on get all dosages > [error]: ${error}`);
                throw error;
            }
        });
    }
    calculateGranulometryEssayData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { granulometrys, viscosity } = body;
                const formattedBody = granulometrys.map((item) => {
                    const { material, material_mass, table_data, bottom } = item;
                    return {
                        generalData: material,
                        step2Data: { material_mass, table_data, bottom },
                    };
                });
                const results = yield Promise.allSettled(formattedBody.map((dto) => this.asphaltGranulometry_Service.calculateGranulometry(dto)));
                const granulometry = results
                    .map((result, index) => {
                    var _a;
                    if (result.status === 'fulfilled') {
                        return Object.assign(Object.assign({}, result.value), { material: granulometrys[index].material });
                    }
                    else {
                        this.logger.warn(`Failed to calculate material ${((_a = granulometrys[index].material) === null || _a === void 0 ? void 0 : _a.name) || index}: ${result.reason}`);
                        return null;
                    }
                })
                    .filter(Boolean);
                const data = { viscosityRotational: viscosity, generalData: viscosity.material };
                const viscosityResult = yield this.rotationalViscosity_Service.calculateViscosityRotational(data);
                return { granulometry, viscosity: { material: viscosity.material, result: viscosityResult }, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculate granulometry essay data > [error]: ${error}`);
                const { status, name, message } = error;
                return { materials: [], success: false, error: { status, message, name } };
            }
        });
    }
    saveGranulometryEssayData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.granulometryEssay_Service.saveGranulometryEssayData(body, userId);
                return result;
            }
            catch (error) {
                this.logger.error(`Error saving granulometry essay data: ${error.message}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveGranulometryEssayResults(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.granulometryEssay_Service.saveGranulometryEssayResults(body, userId);
                return result;
            }
            catch (error) {
                this.logger.error(`Error saving granulometry essay results: ${error.message}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getDosageById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.generalData_Service.getDosageById(dosageId);
                this.logger.log(`dosage returned > [dosage]`);
                return { dosage, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting dosage by id > [error]: ${error}`);
                const { status, name, message } = error;
                return { materials: [], success: false, error: { status, message, name } };
            }
        });
    }
    getGranulometricCompositionData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const { dnitBand, aggregates } = body;
                console.log('=== BACKEND DEBUG ===');
                console.log('Body recebido:', JSON.stringify(body, null, 2));
                console.log('Aggregates count:', aggregates === null || aggregates === void 0 ? void 0 : aggregates.length);
                if (!aggregates || !Array.isArray(aggregates)) {
                    throw new Error('Aggregates data is invalid');
                }
                console.log('=== ESTRUTURA COMPLETA DOS AGGREGATES ===');
                aggregates === null || aggregates === void 0 ? void 0 : aggregates.forEach((agg, index) => {
                    var _a;
                    console.log(`Aggregate ${index} - ${(_a = agg.material) === null || _a === void 0 ? void 0 : _a.name}:`, JSON.stringify(agg, null, 2));
                    console.log('--- Chaves disponíveis:', Object.keys(agg));
                    console.log('Tem data?', !!agg.data);
                    console.log('Tem results?', !!agg.results);
                    console.log('Tem result?', !!agg.result);
                    console.log('Tem granulometryData?', !!agg.granulometryData);
                    if (agg.data) {
                        console.log('Data keys:', Object.keys(agg.data));
                        console.log('Tem data.result?', !!agg.data.result);
                    }
                    if (agg.results) {
                        console.log('Results keys:', Object.keys(agg.results));
                    }
                });
                let higherBand = [];
                let lowerBand = [];
                let porcentagesPassantsN200 = [];
                let nominalSize = 0;
                let percentsOfMaterials = [];
                let listOfPercentsToReturn = [];
                let indexes = [];
                let index;
                let result = {
                    nominalSize: {
                        controlPoints: {
                            lower: [],
                            higher: [],
                        },
                        restrictedZone: {
                            lower: [],
                            higher: [],
                        },
                        curve: [],
                        value: 0,
                    },
                    percentsOfMaterialsToShow: [],
                    percentsOfMaterials: [],
                };
                const granulometryData = [];
                aggregates.forEach((aggregate) => {
                    if (!(aggregate === null || aggregate === void 0 ? void 0 : aggregate.data)) {
                        return;
                    }
                    const { table_data } = aggregate.data;
                    let passants = {};
                    table_data.forEach((p) => {
                        passants[p.sieve_label] = p.passant;
                    });
                    granulometryData.push({
                        _id: aggregate.data.material._id,
                        passants: passants,
                    });
                });
                percentsOfMaterials = aggregates.map((granulometry) => {
                    var _a, _b, _c, _d;
                    if ((_a = granulometry === null || granulometry === void 0 ? void 0 : granulometry.results) === null || _a === void 0 ? void 0 : _a.result) {
                        const resultData = granulometry.results.result;
                        if (resultData.nominal_size && resultData.nominal_size > nominalSize) {
                            nominalSize = resultData.nominal_size;
                        }
                        return resultData.passant_porcentage || [];
                    }
                    if ((_b = granulometry === null || granulometry === void 0 ? void 0 : granulometry.data) === null || _b === void 0 ? void 0 : _b.table_data) {
                        console.log(`Processando dados brutos para ${granulometry.data.material.name}`);
                        const tableData = granulometry.data.table_data;
                        const passantPorcentage = tableData.map(item => [item.sieve_label, item.passant]);
                        let calculatedNominalSize = 0;
                        for (const item of tableData) {
                            if (item.passant < 100 && item.sieve_value > calculatedNominalSize) {
                                calculatedNominalSize = item.sieve_value;
                            }
                        }
                        if (calculatedNominalSize > nominalSize) {
                            nominalSize = calculatedNominalSize;
                        }
                        console.log(`Passant porcentage calculado para ${granulometry.data.material.name}:`, passantPorcentage);
                        console.log(`Nominal size calculado: ${calculatedNominalSize}`);
                        return passantPorcentage;
                    }
                    console.log(`Nenhum dado encontrado para ${(_d = (_c = granulometry.data) === null || _c === void 0 ? void 0 : _c.material) === null || _d === void 0 ? void 0 : _d.name}`);
                    return [];
                });
                result.nominalSize.value = nominalSize;
                for (let i = 0; i < aggregates.length; i++) {
                    porcentagesPassantsN200[i] = null;
                    if ((_b = (_a = aggregates[i]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.table_data) {
                        const n200Sieve = aggregates[i].data.table_data.find(item => item.sieve_value === 0.075 || item.sieve_label.includes('Nº200') || item.sieve_label.includes('0,075'));
                        if (n200Sieve) {
                            porcentagesPassantsN200[i] = n200Sieve.passant;
                            console.log(`N200 encontrado nos table_data para ${aggregates[i].data.material.name}: ${n200Sieve.passant}%`);
                        }
                    }
                    if (porcentagesPassantsN200[i] === null && percentsOfMaterials[i] && percentsOfMaterials[i].length > 0) {
                        const n200Index = percentsOfMaterials[i].length - 1;
                        if (percentsOfMaterials[i][n200Index] !== null && percentsOfMaterials[i][n200Index] !== undefined) {
                            if (Array.isArray(percentsOfMaterials[i][n200Index])) {
                                porcentagesPassantsN200[i] = percentsOfMaterials[i][n200Index][1];
                            }
                            else {
                                porcentagesPassantsN200[i] = percentsOfMaterials[i][n200Index];
                            }
                            console.log(`N200 encontrado no percentsOfMaterials para índice ${i}: ${porcentagesPassantsN200[i]}%`);
                        }
                    }
                    if (porcentagesPassantsN200[i] === null && percentsOfMaterials[i] && percentsOfMaterials[i][6] !== null) {
                        if (Array.isArray(percentsOfMaterials[i][6])) {
                            porcentagesPassantsN200[i] = percentsOfMaterials[i][6][1];
                        }
                        else {
                            porcentagesPassantsN200[i] = percentsOfMaterials[i][6];
                        }
                        console.log(`N200 encontrado no índice 6 para ${i}: ${porcentagesPassantsN200[i]}%`);
                    }
                    console.log(`Valor final de N200 para ${(_e = (_d = (_c = aggregates[i]) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.material) === null || _e === void 0 ? void 0 : _e.name}: ${porcentagesPassantsN200[i]}`);
                }
                const axisX = [38.1, 25.4, 19.1, 12.7, 9.5, 6.3, 4.8, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075];
                const curve38_1 = Array(interfaces_1.AllSievesSuperpaveUpdatedAstm.length).fill(null);
                curve38_1[0] = 100;
                curve38_1[curve38_1.length - 1] = 0;
                const curve25 = Array(interfaces_1.AllSievesSuperpaveUpdatedAstm.length).fill(null);
                curve25[0] = 100;
                curve25[curve25.length - 1] = 0;
                const curve19 = Array(interfaces_1.AllSievesSuperpaveUpdatedAstm.length).fill(null);
                curve19[1] = 100;
                curve19[curve19.length - 1] = 0;
                const curve12 = Array(interfaces_1.AllSievesSuperpaveUpdatedAstm.length).fill(null);
                curve12[2] = 100;
                curve12[curve12.length - 1] = 0;
                const curve9 = Array(interfaces_1.AllSievesSuperpaveUpdatedAstm.length).fill(null);
                curve9[3] = 100;
                curve9[curve9.length - 1] = 0;
                if (nominalSize === 38.1) {
                    result.nominalSize.controlPoints.lower = [100, 90, null, null, null, null, null, 15, null, null, null, null, 0];
                    result.nominalSize.controlPoints.higher = [
                        100,
                        90,
                        null,
                        null,
                        null,
                        null,
                        null,
                        41,
                        null,
                        null,
                        null,
                        null,
                        null,
                        6,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        34.7,
                        23.3,
                        15.5,
                        11.7,
                        10,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([null, null, null, null, null, null, 34.7, 27.3, 21.5, 15.7, 10, null, null], axisX);
                    result.nominalSize.curve = curve38_1;
                }
                else if (nominalSize === 25) {
                    result.nominalSize.controlPoints.lower = [
                        100,
                        90,
                        null,
                        null,
                        null,
                        null,
                        null,
                        19,
                        null,
                        null,
                        null,
                        null,
                        1,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        null,
                        45,
                        null,
                        null,
                        null,
                        null,
                        7,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.5,
                        26.8,
                        18.1,
                        13.6,
                        11.4,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.5,
                        30.8,
                        24.1,
                        17.6,
                        13.7,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve25;
                }
                else if (nominalSize === 19) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        null,
                        23,
                        null,
                        null,
                        null,
                        null,
                        2,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        49,
                        null,
                        null,
                        null,
                        null,
                        8,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        34.6,
                        22.3,
                        16.7,
                        13.7,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        34.6,
                        28.3,
                        20.7,
                        13.7,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve19;
                }
                else if (nominalSize === 12.5) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        28,
                        null,
                        null,
                        null,
                        null,
                        2,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        58,
                        null,
                        null,
                        null,
                        null,
                        10,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        25.6,
                        19.1,
                        15.5,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        31.6,
                        23.1,
                        15.5,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve12;
                }
                else if (nominalSize === 9.5) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        32,
                        null,
                        null,
                        null,
                        null,
                        2,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        null,
                        null,
                        100,
                        null,
                        90,
                        67,
                        null,
                        null,
                        null,
                        null,
                        10,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        31.6,
                        23.1,
                        18.7,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        37.6,
                        37.5,
                        18.7,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve9;
                }
                else {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        28,
                        null,
                        null,
                        null,
                        null,
                        2,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        58,
                        null,
                        null,
                        null,
                        null,
                        10,
                    ];
                    result.nominalSize.restrictedZone.lower = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        25.6,
                        19.1,
                        15.5,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.restrictedZone.higher = yield this.insertBlankPointsOnCurve([
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        31.6,
                        23.1,
                        15.5,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve12;
                }
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < 13; j++) {
                        if (percentsOfMaterials[i][j] !== 100 && percentsOfMaterials[i][j] !== null) {
                            for (let k = j - 1; k >= 0; k--) {
                                if (percentsOfMaterials[i][k] === 100) {
                                    indexes.push(k);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                result.percentsOfMaterialsToShow = listOfPercentsToReturn;
                result.percentsOfMaterials = percentsOfMaterials;
                if (dnitBand === 'A') {
                    higherBand = [
                        100,
                        100,
                        89,
                        78,
                        71,
                        61,
                        55,
                        45,
                        36,
                        28,
                        21,
                        14,
                        7,
                    ];
                    lowerBand = [
                        100,
                        90,
                        75,
                        58,
                        48,
                        35,
                        29,
                        19,
                        13,
                        9,
                        5,
                        2,
                        1,
                    ];
                }
                else if (dnitBand === 'B') {
                    higherBand = [
                        null,
                        100,
                        100,
                        89,
                        82,
                        70,
                        63,
                        49,
                        37,
                        28,
                        20,
                        13,
                        8,
                    ];
                    lowerBand = [
                        null,
                        100,
                        90,
                        70,
                        55,
                        42,
                        35,
                        23,
                        16,
                        10,
                        6,
                        4,
                        2,
                    ];
                }
                else if (dnitBand === 'C') {
                    higherBand = [
                        null,
                        null,
                        100,
                        100,
                        89,
                        78,
                        72,
                        58,
                        45,
                        35,
                        25,
                        17,
                        10,
                    ];
                    lowerBand = [
                        null,
                        null,
                        100,
                        90,
                        73,
                        53,
                        44,
                        28,
                        17,
                        11,
                        6,
                        4,
                        2,
                    ];
                }
                const data = {
                    nominalSize: result.nominalSize,
                    percentsToList: percentsOfMaterials,
                    porcentagesPassantsN200,
                    bands: {
                        letter: dnitBand,
                        higher: higherBand,
                        lower: lowerBand,
                    },
                };
                console.log('=== RESPONSE QUE SERÁ ENVIADO PARA FRONTEND ===');
                console.log(JSON.stringify({
                    data: {
                        nominalSize: result.nominalSize,
                        percentsToList: percentsOfMaterials,
                        porcentagesPassantsN200,
                        bands: {
                            letter: dnitBand,
                            higher: higherBand,
                            lower: lowerBand,
                        },
                        aggregatesData: aggregates.map(agg => ({
                            material: agg.material,
                            data: agg.data,
                            results: agg.results
                        }))
                    },
                    success: true,
                }, null, 2));
            }
            catch (error) {
                this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    insertBlankPointsOnCurve(curve, axisX) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    findEquationOfCurve(curve, axisX, y2, y1, x2, x1, i) {
        return __awaiter(this, void 0, void 0, function* () {
            if (y1 !== y2)
                curve[i] = ((y2 - y1) / (x2 - x1)) * axisX[i] + (y1 * x2 - y2 * x1) / (x2 - x1);
            else
                curve[i] = y1;
            return curve;
        });
    }
    calculateGranulometricCompositionData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const granulometry = yield this.granulometryComposition_Service.calculateGranulometry(body);
                return { data: granulometry.data, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculating granulometric composition data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.granulometryComposition_Service.saveGranulometryCompositionData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getFirstCompressionSpecificMasses(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.initialBinder_Service.getFirstCompressionSpecificMasses(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 5 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveGranulometryCompositionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.granulometryComposition_Service.saveGranulometryCompositionData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 4 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateStep5Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.initialBinder_Service.calculateStep5Data(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculate step 5 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateGmm_RiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.firstCompression_Service.calculateGmm_RiceTest(body);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveInitialBinderStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.initialBinder_Service.saveInitialBinderStep(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save initial binder data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveFirstCompressionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.firstCompression_Service.saveFirstCompressionData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save first compression data on superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getFirstCompressionParametersData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.firstCompressionParams_Service.getFirstCompressionParametersData(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get first compression parameters data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveFirstCompressionParamsData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.firstCompressionParams_Service.saveFirstCompressionParamsData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save percents of chosen curve data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    savePercentsOfChosenCurveData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.chosenCurvePercentages_Service.savePercentsOfChosenCurveData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save percents of chosen curve data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getChosenCurvePercentsData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.chosenCurvePercentages_Service.getChosenCurvePercentsData(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 7 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateSecondCompressionRiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection } = body;
            try {
                const gmm = yield this.secondCompression_Service.calculateSecondCompressionRiceTest(sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculating rice test on second compression step > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    calculateStep7Gmm(gmmData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.secondCompression_Service.calculateStep7Gmm(gmmData);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 gmm data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    calculateSecondCompressionData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.secondCompression_Service.calculateSecondCompressionData(body);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculating the second compression data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveSecondCompressionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.secondCompression_Service.saveSecondCompressionData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save second compression data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getSecondCompressionPercentageData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.secondCompressionParameters_Service.getSecondCompressionPercentageData(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get second compression percentage data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveSecondCompressionParams(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.secondCompressionParameters_Service.saveSecondCompressionParams(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 9 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveConfirmattionCompressionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.confirmCompaction_Service.saveConfirmattionCompressionData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save confirm compaction step data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateStep9RiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.resumeDosageEquation_Service.calculateStep9RiceTest(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 9 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateDosageResumeEquation(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.resumeDosageEquation_Service.calculateDosageResumeEquation(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculating dosage equation superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep11Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.resumeDosageEquation_Service.saveStep11Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 11 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveSuperpaveDosage(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.resumeDosageEquation_Service.saveSuperpaveDosage(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save superpave dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    deleteSuperpaveDosage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.deleteSuperpaveDosage(id);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on delete superpave dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.SuperpaveService = SuperpaveService;
exports.SuperpaveService = SuperpaveService = SuperpaveService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.SuperpaveRepository,
        general_data_superpave_service_1.GeneralData_Superpave_Service,
        granulometry_essay_service_1.GranulometryEssay_Superpave_Service,
        material_selection_superpave_service_1.MaterialSelection_Superpave_Service,
        granulometry_composition_superpave_service_1.GranulometryComposition_Superpave_Service,
        repository_1.AsphaltGranulometryRepository,
        initial_binder_superpave_service_1.InitialBinder_Superpave_Service,
        first_compression_service_1.FirstCompression_Superpave_Service,
        first_curve_percentages_service_1.FirstCurvePercentages_Service,
        chosen_curves_percentages_service_1.ChosenCurvePercentages_Superpave_Service,
        second_compression_superpave_service_1.SecondCompression_Superpave_Service,
        second_compression_parameters_service_1.SecondCompressionParameters_Superpave_Service,
        confirm_compaction_service_1.ConfirmCompaction_Superpave_Service,
        resume_dosage_service_1.ResumeDosage_Superpave_Service,
        service_1.AsphaltGranulometryService,
        viscosityRotational_service_1.ViscosityRotationalService])
], SuperpaveService);
//# sourceMappingURL=index.js.map