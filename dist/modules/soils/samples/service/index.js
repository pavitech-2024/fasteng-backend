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
var SamplesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplesService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const exceptions_1 = require("../../../../utils/exceptions");
const get_essays_by_sample_service_1 = require("./get-essays-by-sample.service");
let SamplesService = SamplesService_1 = class SamplesService {
    constructor(samplesRepository, getEssaysBySample_Service) {
        this.samplesRepository = samplesRepository;
        this.getEssaysBySample_Service = getEssaysBySample_Service;
        this.logger = new common_1.Logger(SamplesService_1.name);
    }
    createSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, userId } = sample;
                const sampleFound = yield this.samplesRepository.findOne({ name, userId });
                if (sampleFound)
                    throw new exceptions_1.AlreadyExists(`Sample with name "${sample.name}"`);
                const createdSample = yield this.samplesRepository.create(sample);
                return createdSample;
            }
            catch (error) {
                this.logger.error(`error on create sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    getSample(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sample = yield this.samplesRepository.findOne({ _id: sampleId });
                if (!sample)
                    throw new exceptions_1.NotFound('Sample');
                const essays = yield this.getEssaysBySample_Service.getEssaysBySample(sample);
                return { sample, essays };
            }
            catch (error) {
                this.logger.error(`error on get sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    getAllSamplesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const samples = yield this.samplesRepository.find();
                return samples.filter((sample) => sample.userId === userId);
            }
            catch (error) {
                this.logger.error(`error on get all samples > [error]: ${error}`);
                throw error;
            }
        });
    }
    updateSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sampleFound = yield this.samplesRepository.findOne({ _id: sample._id });
                if (!sampleFound)
                    throw new exceptions_1.NotFound('Sample');
                return this.samplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
            }
            catch (error) {
                this.logger.error(`error on update sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    deleteSample(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sample = yield this.samplesRepository.findOne({ _id: sampleId });
                if (!sample)
                    throw new exceptions_1.NotFound('Sample');
                return this.samplesRepository.findOneAndDelete({ _id: sampleId });
            }
            catch (error) {
                this.logger.error(`error on delete sample > [error]: ${error}`);
                throw error;
            }
        });
    }
};
exports.SamplesService = SamplesService;
exports.SamplesService = SamplesService = SamplesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.SamplesRepository,
        get_essays_by_sample_service_1.GetEssaysBySample_Service])
], SamplesService);
//# sourceMappingURL=index.js.map