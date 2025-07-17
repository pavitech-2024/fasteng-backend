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
let SuperpaveService = SuperpaveService_1 = class SuperpaveService {
    constructor(superpave_repository, generalData_Service, materialSelection_Service, granulometryComposition_Service, granulometryRepository, initialBinder_Service, firstCompression_Service, firstCurvePercentages_Service, chosenCurvePercentages_Service, secondCompression_Service, secondCompressionParameters_Service, resumeDosageEquation_Service) {
        this.superpave_repository = superpave_repository;
        this.generalData_Service = generalData_Service;
        this.materialSelection_Service = materialSelection_Service;
        this.granulometryComposition_Service = granulometryComposition_Service;
        this.granulometryRepository = granulometryRepository;
        this.initialBinder_Service = initialBinder_Service;
        this.firstCompression_Service = firstCompression_Service;
        this.firstCurvePercentages_Service = firstCurvePercentages_Service;
        this.chosenCurvePercentages_Service = chosenCurvePercentages_Service;
        this.secondCompression_Service = secondCompression_Service;
        this.secondCompressionParameters_Service = secondCompressionParameters_Service;
        this.resumeDosageEquation_Service = resumeDosageEquation_Service;
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
    getUserMaterials(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.materialSelection_Service.getMaterials(userId);
                this.logger.log(`materials returned > [materials]`);
                return { materials, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting all materials by user id > [error]: ${error}`);
                const { status, name, message } = error;
                return { materials: [], success: false, error: { status, message, name } };
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
    saveMaterialSelectionStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.materialSelection_Service.saveMaterials(body, userId);
                return result;
            }
            catch (error) {
                this.logger.error(`Error saving material selection step: ${error.message}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep3Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dnitBand, aggregates } = body;
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
                const allGranulometrys = yield this.granulometryRepository.findAll();
                const ids = aggregates.map((aggregate) => {
                    return aggregate._id.toString();
                });
                const selectedGranulometrys = yield this.granulometryRepository.findById(ids);
                const granulometryData = [];
                aggregates.forEach((aggregate) => {
                    const granulometry = allGranulometrys.find(({ generalData }) => {
                        const { material } = generalData;
                        return aggregate._id.toString() === material._id.toString();
                    });
                    const { passant } = granulometry.step2Data;
                    let passants = {};
                    passant.forEach((p) => {
                        passants[p.sieve_label] = p.passant;
                    });
                    granulometryData.push({
                        _id: aggregate._id,
                        passants: passants,
                    });
                });
                percentsOfMaterials = selectedGranulometrys.map((granulometry) => {
                    if (granulometry.results.nominal_size > nominalSize)
                        nominalSize = granulometry.results.nominal_size;
                    return granulometry.results.passant;
                });
                result.nominalSize.value = nominalSize;
                for (let i = 0; i < selectedGranulometrys.length; i++) {
                    porcentagesPassantsN200[i] = null;
                    if (percentsOfMaterials[i][10] !== null)
                        porcentagesPassantsN200[i] = percentsOfMaterials[i][10][1];
                }
                const axisX = [
                    75, 64, 50, 37.5, 32, 25, 19, 12.5, 9.5, 6.3, 4.8, 2.4, 2, 1.2, 0.6, 0.43, 0.3, 0.18, 0.15, 0.075, 0,
                ];
                const curve37 = [
                    null,
                    null,
                    100,
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
                    0,
                ];
                const curve25 = [
                    null,
                    null,
                    null,
                    100,
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
                    0,
                ];
                const curve19 = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    100,
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
                    0,
                ];
                const curve12 = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    100,
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
                    0,
                ];
                const curve9 = [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    100,
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
                    0,
                ];
                if (nominalSize === 37.5) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        100,
                        90,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        15,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        0,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        null,
                        100,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        34.7,
                        23.3,
                        null,
                        15.5,
                        11.7,
                        null,
                        10,
                        null,
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
                        null,
                        null,
                        null,
                        34.7,
                        27.3,
                        null,
                        21.5,
                        15.7,
                        null,
                        10,
                        null,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve37;
                }
                else if (nominalSize === 25) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        null,
                        100,
                        null,
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
                        null,
                        null,
                        null,
                        1,
                    ];
                    result.nominalSize.controlPoints.higher = [
                        null,
                        null,
                        null,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        39.5,
                        26.8,
                        null,
                        18.1,
                        13.6,
                        null,
                        11.4,
                        null,
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
                        null,
                        null,
                        null,
                        39.5,
                        30.8,
                        null,
                        24.1,
                        17.6,
                        null,
                        11.4,
                        null,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve25;
                }
                else if (nominalSize === 19) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        null,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        34.6,
                        null,
                        22.3,
                        16.7,
                        null,
                        13.7,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        34.6,
                        null,
                        28.3,
                        20.7,
                        null,
                        13.7,
                        null,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve19;
                }
                else if (nominalSize === 12.5) {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        null,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        null,
                        25.6,
                        19.1,
                        null,
                        15.5,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        39.1,
                        null,
                        31.6,
                        23.1,
                        null,
                        15.5,
                        null,
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
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        null,
                        31.6,
                        23.5,
                        null,
                        18.7,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        null,
                        37.6,
                        27.5,
                        null,
                        18.7,
                        null,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve9;
                }
                else {
                    result.nominalSize.controlPoints.lower = [
                        null,
                        null,
                        null,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        null,
                        31.6,
                        23.5,
                        null,
                        18.7,
                        null,
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
                        null,
                        null,
                        null,
                        null,
                        47.2,
                        null,
                        37.6,
                        27.5,
                        null,
                        18.7,
                        null,
                        null,
                        null,
                    ], axisX);
                    result.nominalSize.curve = curve9;
                }
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < percentsOfMaterials[i].length; j++) {
                        if (percentsOfMaterials[i][j] !== null) {
                            for (let k = j; k >= 0; k--) {
                                percentsOfMaterials[i][k] = 100;
                            }
                            break;
                        }
                    }
                }
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    listOfPercentsToReturn.push([]);
                    for (let j = 0; j < percentsOfMaterials[i].length; j++) {
                        listOfPercentsToReturn[i].push(null);
                        if (percentsOfMaterials[i][j] === null) {
                            for (let k = 0; k < percentsOfMaterials.length; k++) {
                                percentsOfMaterials[k][j] = null;
                            }
                        }
                    }
                }
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < 20; j++) {
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
                index = Math.min(...indexes);
                for (let i = 0; i < percentsOfMaterials.length; i++) {
                    for (let j = 0; j < 20; j++) {
                        if (j >= index) {
                            listOfPercentsToReturn[i][j] = percentsOfMaterials[i][j];
                        }
                    }
                }
                result.percentsOfMaterialsToShow = listOfPercentsToReturn;
                result.percentsOfMaterials = percentsOfMaterials;
                if (dnitBand === 'A') {
                    higherBand = [
                        null,
                        null,
                        100,
                        100,
                        null,
                        100,
                        90,
                        null,
                        65,
                        null,
                        50,
                        null,
                        40,
                        null,
                        null,
                        30,
                        null,
                        20,
                        null,
                        8,
                    ];
                    lowerBand = [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1];
                }
                else if (dnitBand === 'B') {
                    higherBand = [
                        null,
                        null,
                        null,
                        100,
                        null,
                        100,
                        100,
                        null,
                        80,
                        null,
                        60,
                        null,
                        45,
                        null,
                        null,
                        32,
                        null,
                        20,
                        null,
                        8,
                    ];
                    lowerBand = [
                        null,
                        null,
                        null,
                        100,
                        null,
                        95,
                        80,
                        null,
                        45,
                        null,
                        28,
                        null,
                        20,
                        null,
                        null,
                        10,
                        null,
                        8,
                        null,
                        3,
                    ];
                }
                else if (dnitBand === 'C') {
                    higherBand = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        100,
                        100,
                        90,
                        null,
                        72,
                        null,
                        50,
                        null,
                        null,
                        26,
                        null,
                        16,
                        null,
                        10,
                    ];
                    lowerBand = [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        100,
                        80,
                        70,
                        null,
                        44,
                        null,
                        22,
                        null,
                        null,
                        8,
                        null,
                        4,
                        null,
                        2,
                    ];
                }
                const data = {
                    nominalSize: result.nominalSize,
                    percentsToList: listOfPercentsToReturn,
                    porcentagesPassantsN200,
                    bands: {
                        letter: dnitBand,
                        higher: higherBand,
                        lower: lowerBand,
                    },
                };
                return {
                    data,
                    success: true,
                };
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
    calculateStep3Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const granulometry = yield this.granulometryComposition_Service.calculateGranulometry(body);
                return { data: granulometry.data, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep3Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.granulometryComposition_Service.saveStep3Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep4SpecificMasses(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.initialBinder_Service.getStep4SpecificMasses(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 4 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep4Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.initialBinder_Service.getStep4Data(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on save step 3 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep4Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.granulometryComposition_Service.saveStep4Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 4 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateGmm(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.firstCompression_Service.calculateGmm(body);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep5Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.firstCompression_Service.saveStep5Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 5 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep6Parameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.firstCurvePercentages_Service.getStep6Parameters(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 6 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep6Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.firstCurvePercentages_Service.saveStep6Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 6 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep7Parameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.chosenCurvePercentages_Service.getStep7Parameters(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 7 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep7Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.chosenCurvePercentages_Service.saveStep7Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 7 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateStep7RiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection } = body;
            try {
                const gmm = yield this.secondCompression_Service.calculateStep7RiceTest(sampleAirDryMass, containerMassWaterSample, containerWaterMass, waterTemperatureCorrection);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 rice test data > [error]: ${error}`);
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
    calculateVolumetricParametersOfChoosenGranulometryComposition(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.secondCompression_Service.calculateVolumetricParametersOfChoosenGranulometryComposition(body);
                return { data: gmm, success: true };
            }
            catch (error) {
                this.logger.error(`error on getting the step 7 volumetric parameters of choosen granulometry composition > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep8Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.secondCompression_Service.saveStep8Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 8 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getStep9Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.secondCompressionParameters_Service.getStep9Data(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on get step 9 data superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep9Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.secondCompressionParameters_Service.saveStep9Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 9 data superpave > [error]: ${error}`);
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
    calculateVolumetricParametersOfConfirmGranulometryComposition(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.resumeDosageEquation_Service.calculateVolumetricParametersOfConfirmGranulometryComposition(body);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on calculating dosage equation superpave > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveStep10Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.resumeDosageEquation_Service.saveStep10Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 10 data superpave > [error]: ${error}`);
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
        material_selection_superpave_service_1.MaterialSelection_Superpave_Service,
        granulometry_composition_superpave_service_1.GranulometryComposition_Superpave_Service,
        repository_1.AsphaltGranulometryRepository,
        initial_binder_superpave_service_1.InitialBinder_Superpave_Service,
        first_compression_service_1.FirstCompression_Superpave_Service,
        first_curve_percentages_service_1.FirstCurvePercentages_Service,
        chosen_curves_percentages_service_1.ChosenCurvePercentages_Superpave_Service,
        second_compression_superpave_service_1.SecondCompression_Superpave_Service,
        second_compression_parameters_service_1.SecondCompressionParameters_Superpave_Service,
        resume_dosage_service_1.ResumeDosage_Superpave_Service])
], SuperpaveService);
//# sourceMappingURL=index.js.map