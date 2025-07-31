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
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../infra/mongoose/database.config");
const repository_1 = require("../../essays/granulometry/repository");
const repository_2 = require("../../essays/chapman/repository");
const repository_3 = require("../../essays/unitMass/repository");
const repository_4 = require("../../essays/sand-increase/repository");
const repository_5 = require("../../essays/coarseAggregate/repository");
let GetEssaysByMaterial_Service = GetEssaysByMaterial_Service_1 = class GetEssaysByMaterial_Service {
    constructor(granulometryRepository, chapmanRepository, unitMassRepository, sandIncreaseRepository, coarseAggregateSpecificMassRepository) {
        this.granulometryRepository = granulometryRepository;
        this.chapmanRepository = chapmanRepository;
        this.unitMassRepository = unitMassRepository;
        this.sandIncreaseRepository = sandIncreaseRepository;
        this.coarseAggregateSpecificMassRepository = coarseAggregateSpecificMassRepository;
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
                        case 'granulometry':
                            response = yield this.granulometryRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'chapman':
                            response = yield this.chapmanRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'unitMass':
                            response = yield this.unitMassRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'sandIncrease':
                            response = yield this.sandIncreaseRepository.findOne({ 'generalData.material._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                        case 'coarseAggregateSpecificMass':
                            response = yield this.coarseAggregateSpecificMassRepository.findOne({ 'generalData.material._id': _id.toString() });
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
                possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
                break;
            case 'fineAggregate':
                possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
                break;
            case 'cement':
                possiblesExperimentTypes = ['granulometry', 'unitMass', 'sandIncrease', 'chapman', 'specificMass'];
                break;
            default:
                possiblesExperimentTypes = [];
                break;
        }
        return possiblesExperimentTypes;
    }
};
exports.GetEssaysByMaterial_Service = GetEssaysByMaterial_Service;
exports.GetEssaysByMaterial_Service = GetEssaysByMaterial_Service = GetEssaysByMaterial_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Material.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [repository_1.ConcreteGranulometryRepository,
        repository_2.ChapmanRepository,
        repository_3.UnitMassRepository,
        repository_4.SandIncreaseRepository,
        repository_5.CoarseAggregateSpecificMassRepository])
], GetEssaysByMaterial_Service);
//# sourceMappingURL=get-essays-by-material.service.js.map