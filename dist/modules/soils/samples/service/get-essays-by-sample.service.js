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
var GetEssaysBySample_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEssaysBySample_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../infra/mongoose/database.config");
const repository_1 = require("../../essays/cbr/repository");
const repository_2 = require("../../essays/compression/repository");
const repository_3 = require("../../essays/hrb/repository");
const repository_4 = require("../../essays/sucs/repository");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const repository_5 = require("../../essays/granulometry/repository");
let GetEssaysBySample_Service = GetEssaysBySample_Service_1 = class GetEssaysBySample_Service {
    constructor(sampleModel, granulometryRepository, cbrRepository, hrbRepository, sucsRepository, compressionRepository) {
        this.sampleModel = sampleModel;
        this.granulometryRepository = granulometryRepository;
        this.cbrRepository = cbrRepository;
        this.hrbRepository = hrbRepository;
        this.sucsRepository = sucsRepository;
        this.compressionRepository = compressionRepository;
        this.logger = new common_1.Logger(GetEssaysBySample_Service_1.name);
    }
    getEssaysBySample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log({ sample }, 'start get essays by sample > soil > [service]');
                const { type, _id } = sample;
                const possiblesExperimentTypes = yield this.findTypeExperiment(type);
                let essays = [];
                for (const essayName of possiblesExperimentTypes) {
                    let essay = null;
                    let response;
                    switch (essayName) {
                        case 'granulometry':
                            response = yield this.granulometryRepository.findOne({ 'generalData.sample._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'cbr':
                            response = yield this.cbrRepository.findOne({ 'generalData.sample._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'hrb':
                            response = yield this.hrbRepository.findOne({ 'generalData.sample._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                            break;
                        case 'sucs':
                            response = yield this.sucsRepository.findOne({ 'generalData.sample._id': _id.toString() });
                            if (response) {
                                essay = { essayName, data: response };
                            }
                        case 'compression':
                            response = yield this.compressionRepository.findOne({ 'generalData.sample._id': _id.toString() });
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
                this.logger.error(`error on get essays of this sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    findTypeExperiment(typeSample) {
        let possiblesExperimentTypes = [];
        switch (typeSample) {
            case 'inorganicSoil':
                possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
                break;
            case 'organicSoil':
                possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
                break;
            case 'pavimentLayer':
                possiblesExperimentTypes = ['granulometry', 'hrb', 'sucs', 'cbr', 'compression'];
                break;
            default:
                possiblesExperimentTypes = [];
                break;
        }
        return possiblesExperimentTypes;
    }
};
exports.GetEssaysBySample_Service = GetEssaysBySample_Service;
exports.GetEssaysBySample_Service = GetEssaysBySample_Service = GetEssaysBySample_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Sample.name, database_config_1.DATABASE_CONNECTION.SOILS)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_5.GranulometryRepository,
        repository_1.CbrRepository,
        repository_3.HrbRepository,
        repository_4.SucsRepository,
        repository_2.CompressionRepository])
], GetEssaysBySample_Service);
//# sourceMappingURL=get-essays-by-sample.service.js.map