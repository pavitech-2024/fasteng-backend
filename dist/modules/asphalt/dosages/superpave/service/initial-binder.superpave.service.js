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
const CURVE_ORDER = ['lower', 'average', 'higher'];
const CURVE_INPUT_INDEX = { lower: 0, average: 1, higher: 2 };
const VLA_FACTOR = {
    lower: 0.95 + 0.96,
    average: 0.95 + 0.965,
    higher: 0.95 + 0.965,
};
const TURN_NUMBER_BY_TRAFFIC = {
    low: { initialN: 6, projectN: 50, maxN: 75, tex: 'Muito leve (local)' },
    medium: { initialN: 7, projectN: 75, maxN: 115, tex: 'Médio (rodovias coletoras)' },
    'medium-high': {
        initialN: 8,
        projectN: 100,
        maxN: 160,
        tex: 'Médio a alto (vias principais, rodovias rurais)',
    },
    high: { initialN: 9, projectN: 125, maxN: 205, tex: 'Alto (interestaduais, muito pesado)' },
};
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
                const materialsIds = (materials !== null && materials !== void 0 ? materials : []).map((element) => element._id).filter(Boolean);
                const specificMasses = [];
                for (const materialId of materialsIds) {
                    const specificMassData = yield this.specificMassRepository.findOne({
                        'generalData.material._id': materialId,
                    });
                    if (specificMassData) {
                        specificMasses.push(specificMassData);
                    }
                }
                return { specificMasses };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateStep5Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log('>>> VERSAO NOVA', body === null || body === void 0 ? void 0 : body.chosenCurves);
                this.logger.log({ chosenCurves: body === null || body === void 0 ? void 0 : body.chosenCurves }, 'start calculate step 5 data > [service]');
                const { specificMassesData, materials: materialsData, percentsOfDosage, chosenCurves, nominalSize, trafficVolume, } = body;
                if (!Array.isArray(chosenCurves) || chosenCurves.length === 0) {
                    throw new Error('Nenhuma curva granulométrica foi selecionada.');
                }
                const binder = materialsData === null || materialsData === void 0 ? void 0 : materialsData.find((e) => e.type === 'asphaltBinder' || e.type === 'CAP');
                const binderSpecificMass = Number(binder === null || binder === void 0 ? void 0 : binder.realSpecificMass);
                if (!Number.isFinite(binderSpecificMass)) {
                    throw new Error('Massa específica do ligante ausente ou inválida.');
                }
                const nominalSizeValue = Number(nominalSize && typeof nominalSize === 'object' ? nominalSize.value : nominalSize);
                if (!Number.isFinite(nominalSizeValue)) {
                    throw new Error('Tamanho nominal máximo ausente ou inválido.');
                }
                const listOfSpecificMasses = this.buildSpecificMassesList(specificMassesData, materialsData);
                if (listOfSpecificMasses.length === 0) {
                    throw new Error('Nenhum agregado com massa específica informada.');
                }
                const granulometryComposition = CURVE_ORDER.filter((curve) => chosenCurves.includes(curve)).map((curve) => this.calculateCurveComposition(curve, percentsOfDosage === null || percentsOfDosage === void 0 ? void 0 : percentsOfDosage[CURVE_INPUT_INDEX[curve]], listOfSpecificMasses, binderSpecificMass, nominalSizeValue));
                const turnNumber = (_a = TURN_NUMBER_BY_TRAFFIC[trafficVolume]) !== null && _a !== void 0 ? _a : {
                    initialN: 0,
                    projectN: 0,
                    maxN: 0,
                    tex: '',
                };
                return { granulometryComposition, turnNumber };
            }
            catch (error) {
                this.logger.error('Falha ao calcular step 5', error);
                throw error;
            }
        });
    }
    buildSpecificMassesList(specificMassesData, materialsData) {
        const isAggregate = (element) => { var _a, _b; return Boolean((_a = element === null || element === void 0 ? void 0 : element.type) === null || _a === void 0 ? void 0 : _a.includes('Aggregate')) || Boolean((_b = element === null || element === void 0 ? void 0 : element.type) === null || _b === void 0 ? void 0 : _b.includes('filler')); };
        const source = Array.isArray(specificMassesData) && specificMassesData.length > 0 ? specificMassesData : materialsData;
        return (source !== null && source !== void 0 ? source : []).filter(isAggregate).map((element) => ({
            bulk: Number(element.realSpecificMass),
            apparent: Number(element.apparentSpecificMass),
            absorption: Number(element.absorption),
        }));
    }
    calculateCurveComposition(curve, percentsOfDosage, listOfSpecificMasses, binderSpecificMass, nominalSizeValue) {
        if (!percentsOfDosage || Object.keys(percentsOfDosage).length === 0) {
            throw new Error(`Porcentagens de dosagem ausentes para a curva "${curve}".`);
        }
        const percentsArray = Object.values(percentsOfDosage).map((value) => Number(value));
        const { denominatorGsb, denominatorGsa } = this.calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage);
        const combinedGsb = 100 / denominatorGsb;
        const combinedGsa = 100 / denominatorGsa;
        let absorve = 0;
        for (let i = 0; i < percentsArray.length; i++) {
            if (listOfSpecificMasses.length > i) {
                absorve += ((percentsArray[i] / 100) * listOfSpecificMasses[i].absorption) / 100;
            }
        }
        const gse = combinedGsb + absorve * (combinedGsa - combinedGsb);
        const vla = (VLA_FACTOR[curve] / (0.05 / binderSpecificMass + 0.95 / gse)) * (1 / combinedGsb - 1 / gse);
        const tmn = nominalSizeValue / 24.384;
        const vle = tmn < 0.5 ? 0.081 : 0.081 - 0.02931 * Math.log(tmn);
        const mag = (0.95 * 0.96) / (0.05 / binderSpecificMass + 0.95 / gse);
        const pli = binderSpecificMass === 0 && mag === 0
            ? 0
            : ((binderSpecificMass * (vle + vla)) / (binderSpecificMass * (vle + vla) + mag)) * 100;
        const percentsOfDosageWithBinder = listOfSpecificMasses.map((_, j) => { var _a; return ((100 - pli) * ((_a = percentsArray[j]) !== null && _a !== void 0 ? _a : 0)) / 100; });
        return {
            combinedGsb,
            combinedGsa,
            gse,
            vla,
            tmn,
            vle,
            mag,
            pli,
            percentsOfDosageWithBinder,
            curve,
        };
    }
    calculateDenominatorGsa_Gsb(listOfSpecificMasses, percentsOfDosage) {
        let denominatorGsb = 0;
        let denominatorGsa = 0;
        const materialKeys = Object.keys(percentsOfDosage);
        for (let i = 0; i < materialKeys.length; i++) {
            const entry = listOfSpecificMasses[i];
            if (!entry)
                continue;
            const percent = Number(percentsOfDosage[materialKeys[i]]);
            if (!Number.isFinite(percent) || !entry.apparent || !entry.bulk) {
                throw new Error(`Massa específica inválida para o material na posição ${i + 1}.`);
            }
            denominatorGsb += percent / entry.apparent;
            denominatorGsa += percent / entry.bulk;
        }
        if (denominatorGsb === 0 || denominatorGsa === 0) {
            throw new Error('Não foi possível calcular as massas específicas combinadas.');
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
exports.InitialBinder_Superpave_Service = InitialBinder_Superpave_Service;
exports.InitialBinder_Superpave_Service = InitialBinder_Superpave_Service = InitialBinder_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        repository_1.SpecifyMassRepository,
        repository_2.SuperpaveRepository])
], InitialBinder_Superpave_Service);
//# sourceMappingURL=initial-binder.superpave.service.js.map