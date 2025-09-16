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
var InitialBinder_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialBinder_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../essays/specifyMass/repository");
const repository_2 = require("../repository");
const mongoose_1 = require("mongoose");
const schemas_1 = require("../schemas");
const mongoose_2 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
let InitialBinder_Superpave_Service = InitialBinder_Superpave_Service_1 = class InitialBinder_Superpave_Service {
    constructor(superpaveModel, specificMassRepository, superpave_repository) {
        this.superpaveModel = superpaveModel;
        this.specificMassRepository = specificMassRepository;
        this.superpave_repository = superpave_repository;
        this.logger = new common_1.Logger(InitialBinder_Superpave_Service_1.name);
    }
    getFirstCompressionSpecificMasses(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { materials } = body;
                const binder = materials.find((material) => material.type === 'asphaltBinder' || material.type === 'CAP');
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
    calculateStep5Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { specificMassesData, materials: materialsData, percentsOfDosage, chosenCurves, nominalSize, trafficVolume, } = body;
                let granulometryComposition = [];
                let listOfSpecificMasses = [];
                let turnNumber = {
                    initialN: 0,
                    projectN: 0,
                    maxN: 0,
                    tex: '',
                };
                const binderSpecificMass = Number(materialsData.find((e) => e.type === 'asphaltBinder' || e.type === 'CAP').realSpecificMass);
                if ((specificMassesData === null || specificMassesData === void 0 ? void 0 : specificMassesData.length) > 0) {
                    specificMassesData.forEach((element) => {
                        if (element && (element.type.includes('Aggregate') || element.type.includes('filler'))) {
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
                if (chosenCurves.includes('lower')) {
                    const denominatorsLower = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    const combinedGsb = 100 / denominatorsLower.denominatorGsb;
                    const combinedGsa = 100 / denominatorsLower.denominatorGsa;
                    granulometryComposition.push({
                        combinedGsa,
                        combinedGsb,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                        curve: 'lower',
                    });
                    let lowerAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[0]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        if (listOfSpecificMasses.length < i) {
                            lowerAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                        }
                        const lowerGse = combinedGsb + lowerAbsorve * (combinedGsa - combinedGsb);
                        const lowerVla = ((0.95 + 0.96) / (0.05 / binderSpecificMass + 0.95 / lowerGse)) * (1 / combinedGsb - 1 / lowerGse);
                        const lowerTmn = nominalSize.value / 24.384;
                        let lowerVle;
                        if (lowerTmn < 0.5) {
                            lowerVle = 0.081 - 0.02931 * 0;
                        }
                        else {
                            lowerVle = 0.081 - 0.02931 * Math.log(lowerTmn);
                        }
                        const lowerMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / lowerGse);
                        const lowerPli = binderSpecificMass === 0 && lowerMag === 0
                            ? 0
                            : ((binderSpecificMass * (lowerVle + lowerVla)) /
                                (binderSpecificMass * (lowerVle + lowerVla) + lowerMag)) *
                                100;
                        for (let j = 0; j < listOfSpecificMasses.length; j++) {
                            granulometryComposition[0].percentsOfDosageWithBinder[j] =
                                ((100 - lowerPli) * percentsOfDosageArray[j]) / 100;
                        }
                        granulometryComposition[0].gse = lowerGse;
                        granulometryComposition[0].vla = lowerVla;
                        granulometryComposition[0].tmn = lowerTmn;
                        granulometryComposition[0].vle = lowerVle;
                        granulometryComposition[0].mag = lowerMag;
                        granulometryComposition[0].pli = lowerPli;
                    }
                }
                if (chosenCurves.includes('average')) {
                    const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    const combinedGsb = 100 / denominatorsAverage.denominatorGsb;
                    const combinedGsa = 100 / denominatorsAverage.denominatorGsa;
                    granulometryComposition.push({
                        combinedGsb,
                        combinedGsa,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                        curve: 'average',
                    });
                    let averageAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[1]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        if (listOfSpecificMasses.length < i) {
                            averageAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                        }
                    }
                    const averageGse = combinedGsb + averageAbsorve * (combinedGsa - combinedGsb);
                    const averageVla = ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / averageGse)) * (1 / combinedGsb - 1 / averageGse);
                    const averageTmn = nominalSize.value / 24.384;
                    let averageVle;
                    if (averageTmn < 0.5) {
                        averageVle = 0.081 - 0.02931 * 0;
                    }
                    else {
                        averageVle = 0.081 - 0.02931 * Math.log(averageTmn);
                    }
                    const averageMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / averageGse);
                    const averagePli = binderSpecificMass === 0 && averageMag === 0
                        ? 0
                        : ((binderSpecificMass * (averageVle + averageVla)) /
                            (binderSpecificMass * (averageVle + averageVla) + averageMag)) *
                            100;
                    for (let j = 0; j < listOfSpecificMasses.length; j++) {
                        granulometryComposition[1].percentsOfDosageWithBinder[j] =
                            ((100 - averagePli) * percentsOfDosageArray[j]) / 100;
                    }
                    granulometryComposition[1].gse = averageGse;
                    granulometryComposition[1].vla = averageVla;
                    granulometryComposition[1].tmn = averageTmn;
                    granulometryComposition[1].vle = averageVle;
                    granulometryComposition[1].mag = averageMag;
                    granulometryComposition[1].pli = averagePli;
                }
                if (chosenCurves.includes('higher')) {
                    const denominatorsAverage = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
                    const combinedGsb = 100 / denominatorsAverage.denominatorGsb;
                    const combinedGsa = 100 / denominatorsAverage.denominatorGsa;
                    granulometryComposition.push({
                        combinedGsb,
                        combinedGsa,
                        gse: 0,
                        vla: 0,
                        tmn: 0,
                        vle: 0,
                        mag: 0,
                        pli: 0,
                        percentsOfDosageWithBinder: [],
                        curve: 'higher',
                    });
                    let higherAbsorve = 0;
                    let percentsOfDosageArray = [];
                    Object.values(percentsOfDosage[2]).forEach((e) => {
                        percentsOfDosageArray.push(e);
                    });
                    for (let i = 0; i < percentsOfDosageArray.length; i++) {
                        if (listOfSpecificMasses.length < i)
                            higherAbsorve += ((percentsOfDosageArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
                    }
                    const higherGse = combinedGsb + higherAbsorve * (combinedGsa - combinedGsb);
                    const higherVla = ((0.95 + 0.965) / (0.05 / binderSpecificMass + 0.95 / higherGse)) * (1 / combinedGsb - 1 / higherGse);
                    const higherTmn = nominalSize.value / 24.384;
                    let higherVle;
                    if (higherTmn < 0.5) {
                        higherVle = 0.081 - 0.02931 * 0;
                    }
                    else {
                        higherVle = 0.081 - 0.02931 * Math.log(higherTmn);
                    }
                    const higherMag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / higherGse);
                    const higherPli = binderSpecificMass === 0 && higherMag === 0
                        ? 0
                        : ((binderSpecificMass * (higherVle + higherVla)) /
                            (binderSpecificMass * (higherVle + higherVla) + higherMag)) *
                            100;
                    for (let j = 0; j < listOfSpecificMasses.length; j++) {
                        granulometryComposition[2].percentsOfDosageWithBinder[j] =
                            ((100 - higherPli) * percentsOfDosageArray[j]) / 100;
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
            let percentSum = 0;
            for (const dosage of percentsOfDosage) {
                const materialKey = Object.keys(dosage)[j];
                const percent = parseFloat(dosage[materialKey] || '0');
                percentSum += percent;
            }
            const bulk = parseFloat(listOfSpecificMasses[j].bulk);
            const apparent = parseFloat(listOfSpecificMasses[j].apparent);
            denominatorGsb += percentSum / bulk;
            denominatorGsa += percentSum / apparent;
        }
        return { denominatorGsb, denominatorGsa };
    }
    saveInitialBinderStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave initial binder step on initial-binder.superpave.service.ts > [body]', { body });
                const { name } = body.initialBinderData;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.initialBinderData, { name: materialName } = _a, initialBinderData = __rest(_a, ["name"]);
                const superpaveWithInitialBinderData = Object.assign(Object.assign({}, superpaveExists._doc), { initialBinderData });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithInitialBinderData);
                if (superpaveExists._doc.generalData.step < 5) {
                    yield this.superpave_repository.saveStep(superpaveExists, 5);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
InitialBinder_Superpave_Service = InitialBinder_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        repository_1.SpecifyMassRepository,
        repository_2.SuperpaveRepository])
], InitialBinder_Superpave_Service);
exports.InitialBinder_Superpave_Service = InitialBinder_Superpave_Service;
//# sourceMappingURL=initial-binder.superpave.service.js.map