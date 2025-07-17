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
var InitialBinder_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialBinder_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const general_data_superpave_service_1 = require("./general-data.superpave.service");
const granulometry_composition_superpave_service_1 = require("./granulometry-composition.superpave.service");
const material_selection_superpave_service_1 = require("./material-selection.superpave.service");
const repository_2 = require("../../../materials/repository");
const repository_3 = require("../../../essays/specifyMass/repository");
let InitialBinder_Superpave_Service = InitialBinder_Superpave_Service_1 = class InitialBinder_Superpave_Service {
    constructor(superpave_repository, generalData_Service, materialSelection_Service, granulometryComposition_Service, asphaltMaterialRepository, specificMassRepository) {
        this.superpave_repository = superpave_repository;
        this.generalData_Service = generalData_Service;
        this.materialSelection_Service = materialSelection_Service;
        this.granulometryComposition_Service = granulometryComposition_Service;
        this.asphaltMaterialRepository = asphaltMaterialRepository;
        this.specificMassRepository = specificMassRepository;
        this.logger = new common_1.Logger(InitialBinder_Superpave_Service_1.name);
    }
    getStep4SpecificMasses(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { materials, binder } = body;
                let materialsIds = [];
                let specificMasses = [];
                materials.forEach((element) => {
                    materialsIds.push(element._id);
                });
                for (let i = 0; i < materialsIds.length; i++) {
                    const specificMassData = yield this.specificMassRepository.findOne({
                        'generalData.material._id': materialsIds[i],
                    });
                    if (specificMassData) {
                        specificMasses.push(specificMassData);
                    }
                }
                const binderSpecificMass = yield this.specificMassRepository.findOne({
                    'generalData.material._id': binder,
                });
                if (binderSpecificMass) {
                    specificMasses.push(binderSpecificMass);
                }
                const data = {
                    specificMasses,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStep4Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { specificMassesData, materials: materialsData, percentsOfDosage, chosenCurves, composition, nominalSize, trafficVolume, } = body;
                let granulometryComposition = [
                    {
                        combinedGsb: 0,
                        combinedGsa: 0,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                    },
                ];
                let listOfSpecificMasses = [];
                let turnNumber = {
                    initialN: 0,
                    projectN: 0,
                    maxN: 0,
                    tex: '',
                };
                const binderSpecificMass = Number(materialsData.find(e => e.type === 'binder').realSpecificMass);
                if ((specificMassesData === null || specificMassesData === void 0 ? void 0 : specificMassesData.length) > 0) {
                    specificMassesData.forEach((element) => {
                        if (element) {
                            listOfSpecificMasses.push({
                                bulk: element.realSpecificMass,
                                apparent: element.apparentSpecificMass,
                                absorption: element.absorption,
                            });
                        }
                    });
                }
                else {
                    materialsData.forEach((element) => {
                        const obj = {
                            bulk: element.realSpecificMass,
                            apparent: element.apparentSpecificMass,
                            absorption: element.absorption,
                        };
                        listOfSpecificMasses.push(obj);
                    });
                }
                if (chosenCurves.lower) {
                    const denominatorsLower = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    granulometryComposition[0].combinedGsb = 100 / denominatorsLower.denominatorGsb;
                    granulometryComposition[0].combinedGsa = 100 / denominatorsLower.denominatorGsa;
                    let lowerAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[0]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        lowerAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                        granulometryComposition[0].gse =
                            granulometryComposition[0].combinedGsb +
                                lowerAbsorve * (granulometryComposition[0].combinedGsa - granulometryComposition[0].combinedGsb);
                        granulometryComposition[0].vla =
                            ((0.95 + 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[0].gse)) *
                                (1 / granulometryComposition[0].combinedGsb - 1 / granulometryComposition[0].gse);
                        granulometryComposition[0].tmn = nominalSize.value / 24.384;
                        granulometryComposition[0].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[0].tmn);
                        granulometryComposition[0].mag =
                            (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[0].gse);
                        granulometryComposition[0].pli =
                            ((binderSpecificMass * (granulometryComposition[0].vle + granulometryComposition[0].vla)) /
                                (binderSpecificMass * (granulometryComposition[0].vle + granulometryComposition[0].vla) +
                                    granulometryComposition[0].mag)) *
                                100;
                        for (let j = 0; j < listOfSpecificMasses.length; j++) {
                            granulometryComposition[0].percentsOfDosageWithBinder[j] =
                                ((100 - granulometryComposition[0].pli) * percentsOfDosageArray[j]) / 100;
                        }
                    }
                }
                if (chosenCurves.average) {
                    granulometryComposition[1] = {
                        combinedGsb: 0,
                        combinedGsa: 0,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                    };
                    const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    granulometryComposition[1].combinedGsb = 100 / denominatorsAverage.denominatorGsb;
                    granulometryComposition[1].combinedGsa = 100 / denominatorsAverage.denominatorGsa;
                    let averageAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[1]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        averageAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                    }
                    granulometryComposition[1].gse =
                        granulometryComposition[1].combinedGsb +
                            averageAbsorve * (granulometryComposition[1].combinedGsa - granulometryComposition[1].combinedGsb);
                    granulometryComposition[1].vla =
                        ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[1].gse)) *
                            (1 / granulometryComposition[1].combinedGsb - 1 / granulometryComposition[1].gse);
                    granulometryComposition[1].tmn = nominalSize.value / 24.384;
                    granulometryComposition[1].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[1].tmn);
                    granulometryComposition[1].mag =
                        (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[1].gse);
                    granulometryComposition[1].pli =
                        ((binderSpecificMass * (granulometryComposition[1].vle + granulometryComposition[1].vla)) /
                            (binderSpecificMass * (granulometryComposition[1].vle + granulometryComposition[1].vla) +
                                granulometryComposition[1].mag)) *
                            100;
                    for (let j = 0; j < listOfSpecificMasses.length; j++) {
                        granulometryComposition[1].percentsOfDosageWithBinder[j] =
                            ((100 - granulometryComposition[1].pli) * percentsOfDosageArray[j]) / 100;
                    }
                }
                if (chosenCurves.higher) {
                    granulometryComposition[2] = {
                        combinedGsb: 0,
                        combinedGsa: 0,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                    };
                    const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    granulometryComposition[2].combinedGsb = 100 / denominatorsAverage.denominatorGsb;
                    granulometryComposition[2].combinedGsa = 100 / denominatorsAverage.denominatorGsa;
                    let higherAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[2]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        higherAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                    }
                    granulometryComposition[2].gse =
                        granulometryComposition[2].combinedGsb +
                            higherAbsorve * (granulometryComposition[2].combinedGsa - granulometryComposition[2].combinedGsb);
                    granulometryComposition[2].vla =
                        ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[2].gse)) *
                            (1 / granulometryComposition[2].combinedGsb - 1 / granulometryComposition[2].gse);
                    granulometryComposition[2].tmn = nominalSize.value / 24.384;
                    granulometryComposition[2].vle = 0.081 - 0.02931 * Math.log(granulometryComposition[2].tmn);
                    granulometryComposition[2].mag =
                        (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / granulometryComposition[2].gse);
                    granulometryComposition[2].pli =
                        ((binderSpecificMass * (granulometryComposition[2].vle + granulometryComposition[2].vla)) /
                            (binderSpecificMass * (granulometryComposition[2].vle + granulometryComposition[2].vla) +
                                granulometryComposition[2].mag)) *
                            100;
                    for (let j = 0; j < listOfSpecificMasses.length; j++) {
                        granulometryComposition[2].percentsOfDosageWithBinder[j] =
                            ((100 - granulometryComposition[2].pli) * percentsOfDosageArray[j]) / 100;
                    }
                }
                if (trafficVolume === 'low') {
                    turnNumber.initialN = 6;
                    turnNumber.projectN = 50;
                    turnNumber.maxN = 75;
                    turnNumber.tex = 'Muito leve (local)';
                }
                else if (trafficVolume === 'medium') {
                    turnNumber.initialN = 7;
                    turnNumber.projectN = 75;
                    turnNumber.maxN = 115;
                    turnNumber.tex = 'Médio (rodovias coletoras)';
                }
                else if (trafficVolume === 'medium-high') {
                    turnNumber.initialN = 8;
                    turnNumber.projectN = 100;
                    turnNumber.maxN = 160;
                    turnNumber.tex = 'Médio a alto (vias principais, rodovias rurais)';
                }
                else if (trafficVolume === 'high') {
                    turnNumber.initialN = 9;
                    turnNumber.projectN = 125;
                    turnNumber.maxN = 205;
                    turnNumber.tex = 'Alto (interestaduais, muito pesado)';
                }
                const data = {
                    granulometryComposition,
                    turnNumber,
                };
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage) {
        let denominatorGsb = 0;
        let denominatorGsa = 0;
        for (let j = 0; j < listOfSpecificMasses.length; j++) {
            denominatorGsb += percentsOfDosage[0].material_1 / listOfSpecificMasses[j].bulk;
            denominatorGsa += percentsOfDosage[0].material_2 / listOfSpecificMasses[j].apparent;
        }
        return { denominatorGsb, denominatorGsa };
    }
};
exports.InitialBinder_Superpave_Service = InitialBinder_Superpave_Service;
exports.InitialBinder_Superpave_Service = InitialBinder_Superpave_Service = InitialBinder_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.SuperpaveRepository,
        general_data_superpave_service_1.GeneralData_Superpave_Service,
        material_selection_superpave_service_1.MaterialSelection_Superpave_Service,
        granulometry_composition_superpave_service_1.GranulometryComposition_Superpave_Service,
        repository_2.MaterialsRepository,
        repository_3.SpecifyMassRepository])
], InitialBinder_Superpave_Service);
//# sourceMappingURL=initial-binder.superpave.service.js.map