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
            var _a, _b;
            try {
                this.logger.log('=========================================');
                this.logger.log('START getEssaysByMaterial');
                this.logger.log(`Material ID: ${material._id}`);
                this.logger.log(`Material Type: ${material.type}`);
                this.logger.log('=========================================');
                const { type, _id } = material;
                const possiblesExperimentTypes = yield this.findTypeExperiment(type);
                this.logger.log(`Possible essay types for material type "${type}":`);
                this.logger.log(possiblesExperimentTypes);
                let essays = [];
                for (const essayName of possiblesExperimentTypes) {
                    this.logger.log(`--- Checking essay: ${essayName} ---`);
                    let essay = null;
                    let response;
                    try {
                        switch (essayName) {
                            case 'adhesiveness':
                                this.logger.log(`Querying adhesiveness with material._id: ${_id.toString()}`);
                                response = yield this.adhesivenessRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Adhesiveness result: ${response ? `FOUND (ID: ${response._id}, Name: ${(_a = response.generalData) === null || _a === void 0 ? void 0 : _a.name})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'elongatedParticles':
                                this.logger.log(`Querying elongatedParticles with material._id: ${_id.toString()}`);
                                response = yield this.elongatedParticlesRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`ElongatedParticles result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'granulometry':
                                this.logger.log(`Querying granulometry with material._id: ${_id.toString()}`);
                                response = yield this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Granulometry result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'specificMass':
                                this.logger.log(`Querying specificMass with material._id: ${_id.toString()}`);
                                response = yield this.specificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`SpecificMass result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'losAngelesAbrasion':
                                this.logger.log(`Querying losAngelesAbrasion with material._id: ${_id.toString()}`);
                                response = yield this.losAngelesAbrasionRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`LosAngelesAbrasion result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'shapeIndex':
                                this.logger.log(`Querying shapeIndex with material._id: ${_id.toString()}`);
                                response = yield this.shapeIndexRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`ShapeIndex result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'sandEquivalent':
                                this.logger.log(`Querying sandEquivalent with material._id: ${_id.toString()}`);
                                response = yield this.sandEquivalentRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`SandEquivalent result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'angularity':
                                this.logger.log(`Querying angularity with material._id: ${_id.toString()}`);
                                response = yield this.angularityRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Angularity result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'viscosityRotational':
                                this.logger.log(`Querying viscosityRotational with material._id: ${_id.toString()}`);
                                response = yield this.viscosityRotationalRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`ViscosityRotational result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'penetration':
                                this.logger.log(`Querying penetration with material._id: ${_id.toString()}`);
                                response = yield this.penetrationRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Penetration result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'softeningPoint':
                                this.logger.log(`Querying softeningPoint with material._id: ${_id.toString()}`);
                                response = yield this.softeningPointRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`SofteningPoint result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'flashPoint':
                                this.logger.log(`Querying flashPoint with material._id: ${_id.toString()}`);
                                response = yield this.flashPointRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`FlashPoint result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'ductility':
                                this.logger.log(`Querying ductility with material._id: ${_id.toString()}`);
                                response = yield this.ductilityRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Ductility result: ${response ? `FOUND (ID: ${response._id}, Name: ${(_b = response.generalData) === null || _b === void 0 ? void 0 : _b.name})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'rtfo':
                                this.logger.log(`Querying rtfo with material._id: ${_id.toString()}`);
                                response = yield this.rtfoRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`Rtfo result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            case 'elasticRecovery':
                                this.logger.log(`Querying elasticRecovery with material._id: ${_id.toString()}`);
                                response = yield this.elasticRecoveryRepository.findOne({ 'generalData.material._id': _id.toString() });
                                this.logger.log(`ElasticRecovery result: ${response ? `FOUND (ID: ${response._id})` : 'NOT FOUND'}`);
                                if (response) {
                                    essay = { essayName, data: response };
                                }
                                break;
                            default:
                                this.logger.log(`Unknown essay type: ${essayName}`);
                                break;
                        }
                    }
                    catch (error) {
                        this.logger.error(`Error checking essay ${essayName}: ${error.message}`);
                        this.logger.error(error.stack);
                    }
                    if (essay) {
                        essays.push(essay);
                        this.logger.log(`✓ Added essay: ${essayName}`);
                    }
                    else {
                        this.logger.log(`✗ No essay found for: ${essayName}`);
                    }
                }
                this.logger.log('=========================================');
                this.logger.log(`Total essays found: ${essays.length}`);
                this.logger.log('=========================================');
                return essays;
            }
            catch (error) {
                this.logger.error(`error on get essays of this material > [error]: ${error}`);
                this.logger.error(error.stack);
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
                    'sandEquivalent',
                ];
                break;
            case 'fineAggregate':
                possiblesExperimentTypes = [
                    'granulometry',
                    'specificMass',
                    'sandEquivalent',
                    'angularity',
                ];
                break;
            case 'filler':
                possiblesExperimentTypes = [
                    'granulometry',
                    'specificMass',
                    'sandEquivalent',
                ];
                break;
            case 'asphaltBinder':
                possiblesExperimentTypes = [
                    'adhesiveness',
                    'viscosityRotational',
                    'penetration',
                    'softeningPoint',
                    'flashPoint',
                    'ductility',
                    'rtfo',
                ];
                break;
            case 'CAP':
                possiblesExperimentTypes = [
                    'adhesiveness',
                    'viscosityRotational',
                    'penetration',
                    'softeningPoint',
                    'flashPoint',
                    'ductility',
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
                    'elasticRecovery',
                    'rtfo',
                ];
                break;
            default:
                possiblesExperimentTypes = [];
                break;
        }
        this.logger.log(`findTypeExperiment for "${typeMaterial}": ${possiblesExperimentTypes.join(', ')}`);
        return possiblesExperimentTypes;
    }
};
exports.GetEssaysByMaterial_Service = GetEssaysByMaterial_Service;
exports.GetEssaysByMaterial_Service = GetEssaysByMaterial_Service = GetEssaysByMaterial_Service_1 = __decorate([
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
//# sourceMappingURL=get-essays-by-material.service.js.map