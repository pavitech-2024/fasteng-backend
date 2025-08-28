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
var MarshallService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarshallService = void 0;
const common_1 = require("@nestjs/common");
const general_data_marshall_service_1 = require("./general-data.marshall.service");
const material_selection_marshall_service_1 = require("./material-selection.marshall.service");
const index_1 = require("../repository/index");
const granulometry_composition_marshall_service_1 = require("./granulometry-composition.marshall.service");
const initial_binder_trial_service_1 = require("./initial-binder-trial.service");
const maximumMixtureDensity_service_1 = require("./maximumMixtureDensity.service");
const volumetric_parameters_service_1 = require("./volumetric-parameters.service");
const optimum_binder_marshall_service_1 = require("./optimum-binder.marshall.service");
const confirm_compression_marshall_service_1 = require("./confirm-compression.marshall.service");
let MarshallService = MarshallService_1 = class MarshallService {
    constructor(marshall_repository, generalData_Service, materialSelection_Service, granulometryComposition_Service, setBinderTrial_Service, maximumMixtureDensity_Service, volumetricParameters_Service, optimumBinder_Service, confirmCompression_Service) {
        this.marshall_repository = marshall_repository;
        this.generalData_Service = generalData_Service;
        this.materialSelection_Service = materialSelection_Service;
        this.granulometryComposition_Service = granulometryComposition_Service;
        this.setBinderTrial_Service = setBinderTrial_Service;
        this.maximumMixtureDensity_Service = maximumMixtureDensity_Service;
        this.volumetricParameters_Service = volumetricParameters_Service;
        this.optimumBinder_Service = optimumBinder_Service;
        this.confirmCompression_Service = confirmCompression_Service;
        this.logger = new common_1.Logger(MarshallService_1.name);
    }
    getAllDosages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosages = yield this.marshall_repository.find();
                const userDosages = dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);
                return userDosages;
            }
            catch (error) {
                this.logger.error(`error on get all dosages > [error]: ${error}`);
                throw error;
            }
        });
    }
    verifyInitMarshall(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.generalData_Service.verifyInitMarshall(body, userId);
                return dosage;
            }
            catch (error) {
                this.logger.error(`error on verify init > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
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
                const success = yield this.materialSelection_Service.saveMaterials(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save materials data marshall step > [error]: ${error}`);
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
                if (dnitBand === "A") {
                    higherBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", 100],
                        ["1 1/2 pol - 37,5mm", 100],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", 100,],
                        ["3/4 pol - 19mm", 90],
                        ["1/2 pol - 12,5mm", null],
                        ["3/8 pol - 9,5mm", 65],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 50],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 40],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 30],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 0],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 8],
                    ];
                    lowerBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", 100],
                        ["1 1/2 pol - 37,5mm", 95],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", 75],
                        ["3/4 pol - 19mm", 60],
                        ["1/2 pol - 12,5mm", null],
                        ["3/8 pol - 9,5mm", 35],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 25],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 20],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 10],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 5],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 1],
                    ];
                }
                else if (dnitBand === "B") {
                    higherBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", null],
                        ["1 1/2 pol - 37,5mm", 100],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", 100],
                        ["3/4 pol - 19mm", 100],
                        ["1/2 pol - 12,5mm", null],
                        ["3/8 pol - 9,5mm", 80],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 60],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 45],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 32],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 20],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 8],
                    ];
                    lowerBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", null],
                        ["1 1/2 pol - 37,5mm", 100],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", 95],
                        ["3/4 pol - 19mm", 80],
                        ["1/2 pol - 12,5mm", null],
                        ["3/8 pol - 9,5mm", 45],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 28],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 20],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 10],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 8],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 3],
                    ];
                }
                else if (dnitBand === "C") {
                    higherBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", null],
                        ["1 1/2 pol - 37,5mm", null],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", null],
                        ["3/4 pol - 19mm", null],
                        ["1/2 pol - 12,5mm", 100],
                        ["3/8 pol - 9,5mm", 90],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 72],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 50],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 26],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 16],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 10],
                    ];
                    lowerBand = [
                        ["3 pol - 75 mm", null],
                        ["2 1/2 pol - 64mm", null],
                        ["2 pol - 50mm", null],
                        ["1 1/2 pol - 37,5mm", null],
                        ["1 1/4 pol - 32mm", null],
                        ["1 pol - 25mm", null],
                        ["3/4 pol - 19mm", null],
                        ["1/2 pol - 12,5mm", 80],
                        ["3/8 pol - 9,5mm", 70],
                        ["1/4 pol - 6,3mm", null],
                        ["Nº4 - 4,8mm", 44],
                        ["Nº8 - 2,4mm", null],
                        ["Nº10 - 2,0mm", 22],
                        ["Nº16 - 1,2mm", null],
                        ["Nº30 - 0,6mm", null],
                        ["Nº40 - 0,43mm", 8],
                        ["Nº50 - 0,3mm", null],
                        ["Nº80 - 0,18m", 4],
                        ["Nº100 - 0,15mm", null],
                        ["Nº200 - 0,075mm", 2],
                    ];
                }
                const dnitBands = { higher: higherBand, lower: lowerBand };
                const table_data = yield this.granulometryComposition_Service.getGranulometryData(aggregates);
                const data = {
                    dnitBands,
                    table_data,
                    project: [],
                    graphData: [],
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
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dnitBands } = body;
                const granulometry = yield this.granulometryComposition_Service.calculateGranulometry(body);
                let higherBand;
                let lowerBand;
                if (dnitBands === "A") {
                    higherBand = [null, null, 100, 100, null, 100, 90, null, 65, null, 50, null, 40, null, null, 30, null, 20, null, 8];
                    lowerBand = [null, null, 100, 95, null, 75, 60, null, 35, null, 25, null, 20, null, null, 10, null, 5, null, 1];
                }
                else if (dnitBands === "B") {
                    higherBand = [null, null, null, 100, null, 100, 100, null, 80, null, 60, null, 45, null, null, 32, null, 20, null, 8];
                    lowerBand = [null, null, null, 100, null, 95, 80, null, 45, null, 28, null, 20, null, null, 10, null, 8, null, 3];
                }
                else if (dnitBands === "C") {
                    higherBand = [null, null, null, null, null, null, null, 100, 90, null, 72, null, 50, null, null, 26, null, 16, null, 10];
                    lowerBand = [null, null, null, null, null, null, null, 80, 70, null, 44, null, 22, null, null, 8, null, 4, null, 2];
                }
                const data = {
                    percentsOfMaterials: granulometry.percentsOfMaterials,
                    sumOfPercents: granulometry.sumOfPercents,
                    pointsOfCurve: granulometry.pointsOfCurve,
                    table_data: granulometry.table_data,
                    projections: granulometry.projections,
                    bands: {
                        higherBand,
                        lowerBand
                    }
                };
                return { data, success: true };
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
                this.logger.error(`error on save materials data abcp step > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateStep4Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const binderTrial = yield this.setBinderTrial_Service.calculateInitlaBinderTrial(body);
                const data = {
                    percentsOfDosage: binderTrial.result.percentsOfDosage,
                    bandsOfTemperatures: binderTrial.result.bandsOfTemperatures,
                    newPercentOfDosage: binderTrial.result.newPercentOfDosage
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on getting the step 3 data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep4Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.setBinderTrial_Service.saveStep4Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getIndexesOfMissesSpecificGravity(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.maximumMixtureDensity_Service.getIndexesOfMissesSpecificGravity(aggregates);
                return { data, success: true };
            }
            catch (error) {
                this.logger.error(`error on save step data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateDmtData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dmt = yield this.maximumMixtureDensity_Service.calculateDmtData(body);
                const data = {
                    maxSpecificGravity: dmt.maxSpecificGravity.result,
                    method: dmt.maxSpecificGravity.method,
                    listOfSpecificGravities: dmt.listOfSpecificGravities
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    calculateGmmData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gmm = yield this.maximumMixtureDensity_Service.calculateGmmData(body);
                const data = {
                    maxSpecificGravity: gmm.maxSpecificGravity.result,
                    method: gmm.maxSpecificGravity.method,
                    listOfSpecificGravities: gmm.listOfSpecificGravities
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    calculateRiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const riceTest = yield this.maximumMixtureDensity_Service.calculateRiceTest(body);
                const data = {
                    maxSpecificGravity: riceTest,
                    method: 'GMM'
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on getting the step 5 dmt data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveMistureMaximumDensityData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.maximumMixtureDensity_Service.saveMistureMaximumDensityData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    setVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const volumetricParameters = yield this.volumetricParameters_Service.setVolumetricParameters(body);
                const data = {
                    volumetricParameters
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on setting step 6 volumetric parameters data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveVolumetricParametersData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.volumetricParameters_Service.saveVolumetricParametersData(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 6 data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    setOptimumBinderContentData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const optimumBinder = yield this.optimumBinder_Service.setOptimumBinderContentData(body);
                const data = {
                    optimumBinder
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on setting step 7 optimum binder data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    setOptimumBinderContentDosageGraph(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { dnitBand, volumetricParameters, trial, percentsOfDosage } = body;
                const optimumBinderDosageGraph = yield this.optimumBinder_Service.plotDosageGraph(dnitBand, volumetricParameters, trial, percentsOfDosage);
                const data = {
                    optimumBinderDosageGraph
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on setting step 7 optimum binder dosage graph data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    getOptimumBinderExpectedParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expectedParameters = yield this.optimumBinder_Service.getExpectedParameters(body);
                const data = {
                    expectedParameters
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on setting step 7 optimum binder dosage graph data > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep7Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.optimumBinder_Service.saveStep7Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 7 data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    confirmSpecificGravity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const confirmedSpecificGravity = yield this.confirmCompression_Service.confirmSpecificGravity(body);
                const data = {
                    confirmedSpecificGravity
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on confirming step 8 specific gravity > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    confirmVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const confirmedVolumetricParameters = yield this.volumetricParameters_Service.confirmVolumetricParameters(body);
                const data = {
                    confirmedVolumetricParameters
                };
                return {
                    data,
                    success: true
                };
            }
            catch (error) {
                this.logger.error(`error on confirming step 8 specific gravity > [error]: ${error}`);
                const { status, name, message } = error;
                return { data: null, success: false, error: { status, message, name } };
            }
        });
    }
    saveStep8Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.confirmCompression_Service.saveStep8Data(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 8 data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveMarshallDosage(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.saveMarshallDosage(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save step 8 data of marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    deleteMarshallDosage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.deleteMarshallDosage(id);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on delete marshall dosage > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.MarshallService = MarshallService;
exports.MarshallService = MarshallService = MarshallService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.MarshallRepository,
        general_data_marshall_service_1.GeneralData_Marshall_Service,
        material_selection_marshall_service_1.MaterialSelection_Marshall_Service,
        granulometry_composition_marshall_service_1.GranulometryComposition_Marshall_Service,
        initial_binder_trial_service_1.SetBinderTrial_Marshall_Service,
        maximumMixtureDensity_service_1.MaximumMixtureDensity_Marshall_Service,
        volumetric_parameters_service_1.VolumetricParameters_Marshall_Service,
        optimum_binder_marshall_service_1.OptimumBinderContent_Marshall_Service,
        confirm_compression_marshall_service_1.ConfirmCompression_Marshall_Service])
], MarshallService);
//# sourceMappingURL=index.js.map