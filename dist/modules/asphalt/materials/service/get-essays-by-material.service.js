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
var GetEssaysByMaterial_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEssaysByMaterial_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../essays/adhesiveness/repository");
const repository_3 = require("../../essays/elongatedParticles/repository");
const repository_4 = require("../../essays/granulometry/repository");
const repository_5 = require("../../essays/specifyMass/repository");
const repository_6 = require("../../essays/shapeIndex/repository");
const repository_7 = require("../../essays/abrasion/repository");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_8 = require("../../essays/sandEquivalent/repository");
const repository_9 = require("../../essays/angularity/repository");
const repository_10 = require("../../essays/viscosityRotational/repository");
const repository_11 = require("../../essays/penetration/repository");
const repository_12 = require("../../essays/softeningPoint/repository");
const repository_13 = require("../../essays/flashPoint/repository");
const repository_14 = require("../../essays/ductility/repository");
const repository_15 = require("../../essays/rtfo/repository");
const repository_16 = require("../../essays/elasticRecovery/repository");
let GetEssaysByMaterial_Service = GetEssaysByMaterial_Service_1 = class GetEssaysByMaterial_Service {
    constructor(materialModel, materialsRepository, adhesivenessRepository, elongatedParticlesRepository, granulometryRepository, specificMassRepository, shapeIndexRepository, losAngelesAbrasionRepository, sandEquivalentRepository, angularityRepository, viscosityRotationalRepository, penetrationRepository, softeningPointRepository, flashPointRepository, ductilityRepository, rtfoRepository, elasticRecoveryRepository) {
        this.materialModel = materialModel;
        this.materialsRepository = materialsRepository;
        this.adhesivenessRepository = adhesivenessRepository;
        this.elongatedParticlesRepository = elongatedParticlesRepository;
        this.granulometryRepository = granulometryRepository;
        this.specificMassRepository = specificMassRepository;
        this.shapeIndexRepository = shapeIndexRepository;
        this.losAngelesAbrasionRepository = losAngelesAbrasionRepository;
        this.sandEquivalentRepository = sandEquivalentRepository;
        this.angularityRepository = angularityRepository;
        this.viscosityRotationalRepository = viscosityRotationalRepository;
        this.penetrationRepository = penetrationRepository;
        this.softeningPointRepository = softeningPointRepository;
        this.flashPointRepository = flashPointRepository;
        this.ductilityRepository = ductilityRepository;
        this.rtfoRepository = rtfoRepository;
        this.elasticRecoveryRepository = elasticRecoveryRepository;
        this.logger = new common_1.Logger(GetEssaysByMaterial_Service_1.name);
    }
    getEssaysByMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log({ material }, 'start get essays by material > asphalt > [service]');
                const { type, _id } = material;
                const possiblesExperimentTypes = yield this.findTypeExperiment(type);
                let essays = [];
                for (const essayName of possiblesExperimentTypes) {
                    let essay = null;
                    let response;
                    switch (essayName) {
                        case 'adhesiveness':
                            response = yield this.adhesivenessRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'elongatedParticles':
                            response = yield this.elongatedParticlesRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'granulometry':
                            response = yield this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'specificMass':
                            response = yield this.specificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'losAngelesAbrasion':
                            response = yield this.losAngelesAbrasionRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'shapeIndex':
                            response = yield this.shapeIndexRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'sandEquivalent':
                            response = yield this.sandEquivalentRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'angularity':
                            response = yield this.angularityRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'viscosityRotational':
                            response = yield this.viscosityRotationalRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'penetration':
                            response = yield this.penetrationRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'softeningPoint':
                            response = yield this.softeningPointRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'flashPoint':
                            response = yield this.flashPointRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'ductility':
                            response = yield this.ductilityRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'rtfo':
                            response = yield this.rtfoRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'elasticRecovery':
                            response = yield this.elasticRecoveryRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        default:
                            break;
                    }
                    if (essay) {
                        essays.push(essay);
                    }
                }
                return essays;
            }
            catch (error) {
                this.logger.error(`error on get essays of this material > [error]: ${error}`);
                throw error;
            }
        });
    }
    findTypeExperiment(typeMaterial) {
        let possiblesExperimentTypes = [];
        switch (typeMaterial) {
            case 'coarseAggregate':
                possiblesExperimentTypes = [
                    'adhesiveness',
                    'elongatedParticles',
                    'granulometry',
                    'specificMass',
                    'shapeIndex',
                    'losAngelesAbrasion',
                    'dosage',
                    'realDensity',
                ];
                break;
            case 'fineAggregate':
                possiblesExperimentTypes = ['granulometry', 'specificMass', 'sandEquivalent', 'realDensity', 'angularity'];
                break;
            case 'filler':
                possiblesExperimentTypes = ['granulometry', 'specificMass', 'sandEquivalent'];
                break;
            case 'asphaltBinder':
                possiblesExperimentTypes = [
                    'viscosityRotational',
                    'penetration',
                    'softeningPoint',
                    'flashPoint',
                    'ductility',
                    'dosage',
                    'rtfo',
                ];
                break;
            case 'CAP':
                possiblesExperimentTypes = [
                    'viscosityRotational',
                    'penetration',
                    'softeningPoint',
                    'flashPoint',
                    'ductility',
                    'dosage',
                    'elasticRecovery',
                    'rtfo',
                ];
                break;
            case 'other':
                possiblesExperimentTypes = [
                    'adhesiveness',
                    'angularity',
                    'elongatedParticles',
                    'sandEquivalent',
                    'granulometry',
                    'specificMass',
                    'shapeIndex',
                    'losAngelesAbrasion',
                    'viscosityRotational',
                    'penetration',
                    'softeningPoint',
                    'flashPoint',
                    'ductility',
                    'dosage',
                    'elasticRecovery',
                    'realDensity',
                ];
                break;
            default:
                possiblesExperimentTypes = [];
                break;
        }
        return possiblesExperimentTypes;
    }
};
GetEssaysByMaterial_Service = GetEssaysByMaterial_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Material.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MaterialsRepository,
        repository_2.AdhesivenessRepository,
        repository_3.ElongatedParticlesRepository,
        repository_4.AsphaltGranulometryRepository,
        repository_5.SpecifyMassRepository,
        repository_6.ShapeIndexRepository,
        repository_7.AbrasionRepository,
        repository_8.SandEquivalentRepository,
        repository_9.AngularityRepository,
        repository_10.ViscosityRotationalRepository,
        repository_11.PenetrationRepository,
        repository_12.SofteningPointRepository,
        repository_13.FlashPointRepository,
        repository_14.DuctilityRepository,
        repository_15.RtfoRepository,
        repository_16.ElasticRecoveryRepository])
], GetEssaysByMaterial_Service);
exports.GetEssaysByMaterial_Service = GetEssaysByMaterial_Service;
//# sourceMappingURL=get-essays-by-material.service.js.map